## 1. 개요

CheckMate는 매장 데이터를 분석하여 점주에게 맞춤형 인사이트를 제공합니다. 이 시스템의 핵심은 LLM을 활용한 고도화된 분석입니다. 하지만 LLM API는 응답 시간이 길고 간헐적인 오류가 발생할 수 있다는 특징이 있습니다. 이를 안정적으로 처리하고 시스템 간의 결합도를 낮추기 위해, **Redis Queue를 활용한 비동기 Worker 아키텍처**를 구축했습니니다.

<br>

## 2. 파이프라인 아키텍처: 왜 비동기 큐인가?

LLM API는 결과 반환에 수십 초가 소요될 수 있습니다. 이를 동기 방식으로 처리하면 서버의 스레드 자원을 오래 점유하게 되어, 전체 서비스의 성능 저하로 이어질 수 있습니다. 이를 방지하기 위해 Redis를 작업 저장소(Queue)로 활용하여 작업을 분리했습니다.

- **자원 격리**: 메인 API 서버의 부하를 방지하기 위해 별도의 워커(Worker) 프로세스에서 분석을 수행합니다.
- **부하 조절**: 대량의 리포트 요청이 들어와도 큐에 쌓아두고 워커가 감당 가능한 속도로 순차 처리할 수 있습니다.
- **재시도**: 작업 실패 시 데이터가 즉시 사라지지 않도록 관리하여 재처리할 수 있는 구조를 만들었습니다.

<br>

## 3. 상세 구현: [스케줄러] → [큐] → [워커]

전체 파이프라인은 작업을 생성하는 Producer, 저장하는 Queue, 실행하는 Worker의 3단계로 구성됩니다.

### 3-1. [Producer] 지능형 스케줄러 (`ReportScheduler`)

매 30분마다 영업이 마감된 매장을 탐색하여 분석 태스크를 생성합니다. 마감 매장을 확인하고 분석 대상 기간을 계산한 뒤, Redis 큐에 작업을 적재합니다.

### 3-2. [Queue] Redis를 활용한 작업 관리 (`ReportTaskRepository`)

작업의 유실 가능성을 줄이기 위해 Redis의 원자적(Atomic) 연산을 활용합니다. `RPOPLPUSH` 메커니즘을 사용하여 큐에서 작업을 가져오는 즉시 `PROCESSING` 리스트로 옮깁니다. 이 방식을 통해 워커가 작업 도중 다운되더라도 어떤 작업이 중단되었는지 추적할 수 있도록 설계했습니다.

### 3-3. [Worker] 리포트 생성 및 알림 처리 (`ReportWorker`)

워커는 주기적으로 큐를 확인하며 실제 리포트 생성 로직을 수행합니다.

1. **Polling**: 5초마다 Redis 큐를 확인하여 대기 중인 작업을 가져옵니다.
2. **Data Fetching**: 리포트 종류에 맞는 매출, 주문수 등의 원천 데이터를 DB에서 조회합니다.
3. **LLM Interaction**: 수집된 데이터를 기반으로 프롬프트를 구성해 LLM API에 전달합니다.
4. **Persistence & Notification**: LLM이 반환한 인사이트를 DB에 저장합니다. 이후  레디스에 `notification:unread:{storeId}` 형태의 키를 생성하여, 점주가 앱에 접속했을 때 새로운 리포트에 대한 알림을 확인 할 수 있습니다.

```java
@Component
@RequiredArgsConstructor
public class ReportWorker {
    @Scheduled(fixedDelay = 5000)
    public void processTask() {
        // 1. Redis 큐에서 작업 원자적 획득
        ReportTask task = reportTaskRepository.popAndStart();
        if (task == null) return;

        try {
            // 2. 데이터 분석 및 LLM 호출
            ReportData data = reportQueryService.generateReport(task);
            String llmResponse = llmClient.ask(promptProvider.getPrompt(task.type()), data);

            // 3. 결과 저장 및 Redis 알림 상태 업데이트
            // notification:unread:{storeId} 키를 활용해 읽지 않은 알림 저장
            saveAndMarkAsUnread(task, llmResponse);

            // 4. 성공 시 처리 완료 큐에서 제거
            reportTaskRepository.remove(task);
        } catch (Exception e) {
            // 5. 실패 시 로그 남기기 및 재시도 정책 수행
            log.error("리포트 생성 실패: {}", task.getId(), e);
            reportTaskRepository.handleFailure(task);
        }
    }
}
```

<br>

## 4. 리포트 데이터 구조화 및 활용

LLM의 비정형 텍스트 응답을 서비스에서 활용하기 좋은 정형 데이터(JSON)로 변환하여 저장합니다.

- **KPI 지표**: 매출, 주문수 등 핵심 지표를 이전 대비 증감율과 함께 구조화합니다.
- **인사이트 시각화**: LLM이 도출한 전략적 제안을 리스트 형태로 파싱하여, 하루 리포트 페이지에서 가독성 있게 보여줍니다.

<br>

## 5. 결론

이번 Redis Queue 기반의 아키텍처 도입을 통해 **'성능'과 '안정성' 사이의 균형**을 잡고자 노력했습니다.

1. **외부 의존성 격리**: 수십 초가 소요되는 LLM API의 지연이 메인 서비스의 응답 속도에 영향을 주지 않도록 격리하여 전체적인 시스템 안정성을 확보했습니다.
2. **원자적 상태 관리를 통한 신뢰성 확보**: Redis의 원자적 연산(RPOPLPUSH)을 활용해 작업 유실을 방지하는 '메시지 큐' 본연의 기능을 구현했습니다.
3. **확장성 있는 구조**: 큐를 중심으로 Producer와 Worker가 분리되어 있어, 향후 리포트 요청이 늘어나더라도 워커 인스턴스를 스케일링하는 것만으로 유연하게 대응할 수 있는 기틀을 마련했습니다.