# SSE (Server-Sent Events)



## 1. SSE란 무엇인가?

- **HTTP 기반의 서버 → 클라이언트 단방향 스트리밍**
- 하나의 HTTP 요청이 **즉시 끝나지 않고 열린 상태로 유지**
- 서버는 해당 연결을 통해 **여러 이벤트를 순차적으로 push**

### 핵심

- **요청은 1번, 응답은 여러 번**



## 2. SSE 라이프사이클 전체 흐름

1. 클라이언트 연결 요청
2. 서버가 SSE 연결을 열어둠
3. 서버가 이벤트들을 전송
4. 클라이언트 수신
5. 연결 종료 (정상 / 에러 / 타임아웃)



## 3. 클라이언트 연결 요청

### 클라이언트 측

```jsx
const es =newEventSource("/sse/connect");
```

- 브라우저가 **GET 요청** 전송
- 이 요청은 **끝나지 않는 요청**


## 4. 서버에서 SSE 연결 생성

### Spring Controller

```java
@GetMapping("/connect")
public SseEmitterconnect() {
SseEmitteremitter=newSseEmitter(timeout);
return emitter;
}
```

### 이 시점에 무슨 일이 벌어지나?

- Spring MVC가 요청을 **비동기(Async)** 로 전환
- 소켓 연결 유지
- HTTP Response는 **완료되지 않음**
- 연결 수립 후  **`timeout`** 지나면 서버에서 연결 종료

### 중요

- 이 시점부터 `SseEmitter` 는 **아직 살아 있는 응답 객체**



### 비동기 확인용 로그 설정

```yaml
logging:
level:
org.springframework.web.servlet.DispatcherServlet:DEBUG
org.springframework.web.context.request.async:DEBUG
```

```
Started async request for "/sse/connect"
Exiting but response remains open for further handling
```



## 5. SSE 연결의 실체는 어디에 있나?

- **TCP 소켓 + HTTP 응답 스트림**
    - 서버가 HTTP 응답 바디를 한 번에 끝내지 않고
    - **여러 번에 걸쳐 write**
    - 스트림을 **닫지 않음**
    - TCP 연결 유지
- 헤더는 최초 1번만 전송
- **같은 HTTP 응답의 body를 계속 확장**

### 서버 메모리에는

- `SseEmitter` 객체
- 해당 emitter가 참조하는 **Response OutputStream**



## 6. 서버에서 이벤트 전송

### SseEventBuilder

- id
    - 이벤트 고유 ID 설정
    - 클라이언트가 마지막으로 받은 이벤트 기억
    - 연결이 끊기면 이어 받기 가능
- name
    - 이벤트 타입 이름 설정
- reconnectTime
    - 클라이언트가 연결이 끊어졌을 때 **얼마 후 다시 서버에 재연결할지 지정**
        - read error 등으로 감지
    - 브라우저는 SSE에서 자동 재연결 기능을 기본 제공
        - reconnectTime 기본값 있음
    - Last-Event-ID 기반 복구
- comment
    - SSE 주석 추가
    - 클라이언트는 무시함
    - heartbeat 용
        - SSE는 프록시 / 로드밸런서 / 방화벽 등이 오랫동안 데이터 없으면 연결 끊어버릴 수 있음
- data
    - 실제 데이터 payload
    - spring이 자동으로 JSON 직렬화
    - 여러 줄 허용

### 서버 코드

```java
emitter.send(
    SseEmitter.event()
        .name("chat")
        .data("hello")
);
```

### 내부적으로 일어나는 일

- Spring이 이벤트를 **SSE 포맷 문자열로 변환**
- 기존 HTTP 응답 스트림에 **write + flush**
- 연결은 유지됨

### 실제 전송되는 HTTP Body

```
event: chat
data: hello
```

### 중요

- 이벤트는 **HTTP 응답을 추가로 쓰는 것**
- 새로운 응답이 아님


## 7. SSE 연결 유지 상태

- 서버
    - 언제든 `send()` 가능
- 클라이언트
    - 이벤트를 계속 수신
- 이 상태에서
    - 응답은 **완전히 끝나지 않음**



## 8. SSE 연결 종료 (중요)

### 종료되는 경우

### 1. 클라이언트가 끊음

- 탭 닫기
- 새로고침

### 2. 서버가 끊음

- `emitter.complete()`
- 타임아웃 발생



## 9. 서버는 끊김을 어떻게 아는가?

- HTTP는 가상 연결인데 서버가 어떻게 알까?

### 실제 원리

- TCP 레벨
    - FIN / RST
    - write 시 `IOException`
- 또는
    - Async request timeout

### 핵심

- 서버는 **끊김 이벤트를 직접 받지 않음**
- **더 이상 쓸 수 없다는 사실로 인지**



## 10. SSE 콜백들의 의미

```java
emitter.onTimeout(...)
emitter.onError(...)
emitter.onCompletion(...)
```

### onTimeout

- 서버가 정한 **async timeout 초과 시**

```java
new SseEmitter(30_000L);// 30초
```

- 네트워크가 멀쩡해도
- 클라이언트가 살아 있어도
- **시간만 지나면 호출됨**
- 이벤트 idle timeout 아님

---

### onError

- 비동기 처리 중 예외 발생 시
- 이미 끊긴 상태에서 `send()` 시도 등

---

### onCompletion

- Async 요청이 **완전히 종료될 때**
- 정상 / 에러 / 타임아웃 **모두 포함**

```java
emitter.onCompletion(() -> {
// 리소스 정리
});
```

**정리 작업은 여기서**



## 11. SSE 연결 단위

| 행동 | 결과 |
| --- | --- |
| 새 탭 열기 | 새 SSE 연결 |
| 새로고침 | 기존 연결 종료 + 새 연결 |
| 탭 닫기 | 연결 종료 |

**SSE 연결 = 브라우저 탭 단위**