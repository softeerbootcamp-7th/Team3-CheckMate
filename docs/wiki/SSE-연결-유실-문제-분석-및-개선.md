#  SSE 연결 유실 문제 분석 및 개선

# 1. 배경

본 서비스는 매출과 메뉴에 대한 매장 운영 지표를 실시간으로 제공하는 대시보드 기반 시스템이다.

사용자는 대시보드에 구성된 지표 집합을 기준으로  
주문 발생에 따라 관련 지표를 실시간으로 확인할 수 있다.



이를 위해 서버는 다음 두 가지 메커니즘을 사용한다.

1. **SSE 연결**
   - 클라이언트와 서버 간의 지속적인 스트리밍 연결을 유지
   - 실시간 이벤트 전송을 위한 세션 관리

2. **구독(Subscription) 관리**
   - 실시간으로 확인하고 싶은 지표를 선택하여 구독하고 관리

즉, 특정 매장(storeId)에 대해
SSE 연결(Session)과 지표 구독(Subscription)이 함께 관리되는 구조이다.
## 현재 구조

### 1. SseEmitterManager

SseEmitterManager는 매장(storeId) 단위로 SSE 연결과 구독 정보를 중앙에서 관리하는 컴포넌트이다.  
내부에서는 다음 두 가지 Map 구조를 사용한다.

#### 1-1. Emitter Map
storeId → emitter

#### 1-2. 구독 Map
storeId → Set<지표>




### 2. 타임아웃 및 하트비트
- 연결 이후 일정 시간 이후 SSE 연결 종료
- 주기적으로 heartbeat 이벤트 전송
  - 연결 유지 여부 확인용

---

# 2.  동작 흐름

## 2.1 SSE 연결 요청

1. 클라이언트가 SSE 연결 요청
2. 서버는 storeId 기준으로 기존 연결 존재 여부 확인

###  기존 연결이 있을 경우

- 기존 연결 정리
  - 기존 emitter 종료
  - 기존 구독 정리
- 새로운 emitter 저장



### 기존 연결이 없을 경우

- 새로운 emitter 저장

###

```java
SseEmitter newEmitter = new SseEmitter();

emitters.compute(
        storeId,
        (key, existingEmitter) -> {
            if (existingEmitter != null) {
                existingEmitter.complete(); // 기존 연결 종료

                subscriptions.remove(storeId); // 기존 topic만 정리
            }
            return newEmitter; // 새 Emitter 등록
        });
```


## 2.2 구독 요청 흐름

3. 클라이언트가 대시보드 지표 목록으로 구독 API 호출
4. 서버에서 지표 목록을 구독 Map에 저장

## 2.3 이벤트 전송

6. 주문 발생 시 구독된 지표 기반으로 실시간 이벤트 전송
7. 30초마다 heartbeat 이벤트 전송 (연결 유지 확인용)

---

# 3. 문제 상황

###  클라이언트 새로고침


(연결[1] + 구독[1])
→ 새로고침
→ (연결[2] + 구독[2])


###  증상

- 하트비트는 정상 수신
- 실제 이벤트는 수신되지 않음
- 서버 상태:
  - Emitter Map에는 연결 존재
  - 구독 Map이 비어 있음

---

# 4. 원인 분석

## 4.1 가설
### 클라이언트 요청 순서와 서버 처리 순서 불일치

네트워크 지연 + CPU 스케줄링으로 인해 처리 순서가 뒤바뀔 수 있음


구독[1] → 연결[1] → **구독[2] → 연결[2]**





기존 구현에서는

- 새로운 연결 요청 시
  - 이전 emitter 종료
  -  구독 정리

이 과정에서 **연결[2]가 구독[2]까지 삭제되는 문제 발생**

## 4.2 확인

###  테스트 코드

```java
@DisplayName("네트워크 지연으로 구독 요청이 선도착할 경우 구독이 사라지는 문제 재현")
@Test
void reconnect_clears_subscription_bug() {

    /*
     * given
     * */

    Long storeId = 2L;

    List<AnalysisCardCode> subscriptions1 = List.of(SLS_01_01, SLS_02_01);

    List<AnalysisCardCode> subscriptions2 = List.of(MNU_01_01, MNU_02_01);

    /*
     * when
     * */

    // 연결[1]
    manager.addEmitter(storeId);

    // 구독[1]
    manager.subscribe(storeId, subscriptions1);

    /*
     * 네트워크 지연 상황 재현
     * */

    // 구독[2] 먼저 도착
    manager.subscribe(storeId, subscriptions2);

    // 연결[2] 연결
    manager.addEmitter(storeId);

    /*
     * then
     * */

    Set<AnalysisCardCode> currentSubscriptions = manager.getSubscribedTopics(storeId);

    log.info("currentSubscriptions={}", currentSubscriptions);

    // 현재 버그 상황 검증
    assertThat(currentSubscriptions).isEmpty();
}

```

###  실행 결과

```java
currentSubscriptions=[]

> Task :test
SseTestManagerWithSubscriptionTest > 네트워크 지연으로 구독 요청이 선도착할 경우 구독이 사라지는 문제 재현 PASSED
BUILD SUCCESSFUL in 1s

```

---

# 5. 1차 해결 시도

### 전략

- 기존 연결 정리에서 구독 정리 로직  제거
- 리소스 정리는 `onCompletion()` 콜백에서 처리

```java
emitter.onCompletion(() -> {
    subscriptionMap.remove(storeId);
    emitterMap.remove(storeId);
});
```




# 6. 추가로 발생한 문제

1차 개선 이후에도 문제가 완전히 해결되지 않았다.

## 6.1 발생한 문제
- emitter와 구독이 모두 사라짐


## 6.2 가설


(연결[1], 구독[1]) → (연결[2], 구독[2])→ **연결[1] onCompletion() 실행**

이때 기존 구현에서는 `onCompletion()`에서 아래 로직을 수행했다.

- subscriptionMap.remove(storeId)
- emitterMap.remove(storeId)


**이전 연결(연결[1])의 `onCompletion()` 콜백 지연 실행으로 인해**  
**현재 활성 연결(연결[2])의 리소스(emitter, 구독)까지 삭제되는 문제**가 발생

## 6.3 확인

### 테스트 코드

```java
@DisplayName("지연된 onCompletion 콜백으로 새 연결이 제거되는 문제 재현")
@Test
void delayed_onCompletion_callback_removes_new_connection_bug() {

    /*
     * given
     */
    Long storeId = 2L;

    List<AnalysisCardCode> subscriptions1 =
            List.of(SLS_01_01, SLS_02_01);

    List<AnalysisCardCode> subscriptions2 =
            List.of(MNU_01_01, MNU_02_01);

    /*
     * when
     */

    // 연결[1]
    manager.addEmitter(storeId);

    // 구독[1]
    manager.subscribe(storeId, subscriptions1);

    // 네트워크 지연 상황 재현
    // 구독[2] 먼저 도착
    manager.subscribe(storeId, subscriptions2);

    // 연결[2]
    manager.addEmitter(storeId);

    /*
     * 늦은 onCompletion 콜백 재현
     */

    Map<Long, SseEmitter> emitters = manager.getEmitters();
    Map<Long, Set<AnalysisCardCode>> subscriptions = manager.getSubscriptions();

    subscriptions.remove(storeId);
    emitters.remove(storeId);

    /*
     * then
     */

    SseEmitter emitter = manager.getEmitter(storeId);
    Set<AnalysisCardCode> currentSubscriptions =
            manager.getSubscribedTopics(storeId);

    log.info("emitter={}", emitter);
    log.info("currentSubscriptions={}", currentSubscriptions);

    // 버그 재현 검증
    assertThat(emitter).isNull();
    assertThat(currentSubscriptions).isEmpty();
}

```

### 실행 결과

```java
emitter=null
currentSubscriptions=[]

> Task :test
SseTestManagerWithSubscriptionTest > 지연된 onCompletion 콜백으로 새 연결이 제거되는 문제 재현 PASSED
BUILD SUCCESSFUL in 1s

```

---



# 7. 원인

### 1. 구독 정리 조건 부재

`onCompletion()`에서 구독을 정리할 때 현재 emitter의 존재 여부를 확인하지 않았다.

즉,

- Emitter Map에 여전히 활성 emitter가 존재함에도
- subscriptionMap.remove(storeId)를 수행

그 결과,

- 연결은 살아 있으나
구독 정보만 삭제되어
- **하트비트는 오지만 이벤트는 오지 않는 상태가 발생**

### 2. 기존 Emitter Map 구조


storeId → emitter


storeId 기준으로만 리소스를 관리했기 때문에

- 어떤 emitter가 종료된 것인지 구분 불가능
- 현재 활성 emitter와 이전 emitter를 식별할 수 없음


# 8. 해결 전략

### 핵심 아이디어

`onCompletion()`에서 리소스를 정리할 때 다음 **두 가지**를 보장해야 한다.

#### 1. **활성 emitter가 존재하는 경우에는 구독을 정리하면 안 된다.**

- Emitter Map에 여전히 활성 세션이 있다면
- subscriptionMap.remove(storeId)를 수행하면 안 됨
- 그렇지 않으면 하트비트는 오지만 이벤트가 오지 않는 상태가 발생

#### 2.  Emitter Map 정리 시, 현재 종료된 emitter와  Map에서 관리 중인 emitter를 구분할 수 있어야 한다.

- storeId 기준으로만 제거하면 안 됨
- 실제로 종료된 emitter인지 식별 필요

---

# 9. 개선된 코드

## 9.1 onCompletion() 정리 로직

핵심 목표는 다음 두 가지를 보장하는 것이다.

1. 종료된 emitter와 현재 활성 emitter를 구분한다.

2. 활성 emitter가 존재하는 경우에는 구독을 제거하지 않는다.
```java
emitter.onCompletion(() -> {

    // 1️. 종료된 emitter가 현재 Map에 등록된 emitter와 동일한 경우에만 제거
    emitters.computeIfPresent(
        storeId,
        (key, session) ->
            session.emitterId().equals(emitterId) ? null : session
    );

    // 2️. emitter가 완전히 제거된 경우에만 구독 정리
    emitters.compute(
        storeId,
        (key, session) -> {
          
            if (session == null) {
                subscriptionMap.remove(storeId);
            }

            return session;
        }
    );
});
```

## 9.2 Emitter Map 구조

기존에는 `storeId → emitter` 구조였지만,  
종료된 emitter와 현재 활성 emitter를 구분하기 위해  
`emitterId`를 포함한 세션 객체로 구조를 변경하였다.

```java
public record SseSession(
    String emitterId,
    SseEmitter emitter
) {}
```
### 변경된 구조
storeId → SseSession

# 10. 설계 고려 사항

## 10.1. emitter 제거 `compute` 내부에서 구독을 함께 제거하지 않은 이유

emitter 제거는 `compute`를 통해 atomic 하게 처리했지만,  
같은 블록 안에서 구독을 함께 제거하지는 않았다.

그 이유는 다음과 같다.

- storeId 기준으로만 구독을 관리하고 있기 때문에
- 해당 구독이 **종료되는 연결의 구독인지**
- 아니면 **새로운 요청으로 생성된 구독인지 구분할 수 없음**

따라서 emitter 제거 시점에 구독까지 함께 삭제하면  
**다른 요청에서 생성된 정상 구독이 제거될 위험**이 존재한다.



## 10.2. 구독 정리 시 단순 `get()` 대신 `compute()`를 사용한 이유

구독을 정리할 때 단순히

```java
if (emitters.get(storeId) == null) {
    subscriptionMap.remove(storeId);
}
```

와 같이 처리할 경우,
 null 체크 이후

새로운 연결 및 새로운 구독 요청이 들어올 수 있음

즉,
```
get() → null 확인
→ (다른 스레드에서 새 연결의 구독 등록)
→ remove() 실행
```

이 순서가 발생하면
새로운 요청의 구독이 삭제될 수 있다.