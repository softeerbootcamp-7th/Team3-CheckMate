# SSE에 대해 알아보자

# SSE - Server Sent Event란?

SSE는 서버의 데이터를 실시간으로 지속적으로 Streaming 하는 기술이다.

SSE는 웹 표준으로써 IE를 제외한 모든 브라우저에서 지원되며, IE 역시 Polyfill을 통해 지원이 가능함

<img width="655" height="391" alt="image" src="https://github.com/user-attachments/assets/117ea638-d428-4cf1-9a87-15ac3a6f8af9" />

기존에는 서버의 변경된 데이터를 가져오기 위해서 페이지 새로고침, 지속적으로 request를 보내는 AJAX 폴링, 외부 플러그인 이용 등을 사용해야 했다.

이외에도 WebSocket을 사용할 수 있지만, HTTP 통신을 이용하는 것이 아닌 웹소켓만을 위한 별도의 서버와 프로토콜로 통신하기 때문에 구현하는 비용이 많이 든다는 단점이 있다.

하지만 SSE는 기존 HTTP 웹 서버에서 HTTP API만으로 동작하며, 구현도 간단하여 서버, 클라이언트 양측 모두 매우 쉽게 개발 가능하다

## Server Sent Event 특징

- 브라우저는 서버가 생성한 Stream을 계속 받는다. (Server에서 보내는 Read Only)
- Connection 유지를 위해 HTTP 프로토콜 사용 → HTTP 2.0을 통한 Multiplexing 가능
- 연결이 끊어지면 EventSource가 오류 이벤트를 발생시키고 자동으로 다시 연결을 시도함
- 표준 기술로 IE를 제외한 브라우저 대부분을 지원 → Polyfill 사용 시 IE 사용 가능

## Server Sent Event 사용 시점

- 효율적인 단방향 통신이 필요할 때
- 실시간 데이터 스트리밍망에 HTTP를 사용하려는 경우 (RESTful의 GET method와 유사함)

사용 예시

- 암호 화폐 또는 주가 피드 구독
- SNS 피드 구독
- 뉴스 업데이트 또는 알림

# WebSocket vs Server Sent Event

WebSocket과 Server Sent Event는 대표적 실시간 통신이라는 공통점이 있다.

대표적인 차이점은 Socket은 양방향(클라이언트↔서버)으로 데이터를 주고 받을 수 있지만, SSE (Server Sent Event)를 사용하게 되면 클라이언트는 데이터를 받을 수만 있다는 점이다. (클라이언트←서버)

|  | Web Socket | Server Sent Event |
| --- | --- | --- |
| 브라우저 지원 | 대부분 브라우저에서 지원 | 대부분 모던 브라우저에서 지원 (Polyfill 사용 시 IE 지원) |
| 통신 방향 | 양방향 (Full Duplex) | 단방향 (서버 → 클라이언트) |
| 리얼타임 | Yes  | Yes |
| 데이터 형태  | Binary, UTF-8 ⇒ 자유 형식 | UTF-8 |
| 자동 재접속 | No | Yes (3초마다 시도) |
| 최대 동시 접속 수 | 브라우저 연결 한도는 없지만 서버 설정에 따라 다름 | HTTP 1.1 사용 시 브라우저 당 6개 HTTP 2.0 사용 시 100개가 기본 |
| 프로토콜  | websocket | HTTP |
| 배터리 소모량 | 큼 | 작음 |
| Firewall 친화적 | Nope | Yes |
| 연결 유지 방식 | 핸드셰이크 후 지속 연결 | HTTP 연결을 지속 유지 |

## 동작 방식

### WebSocket

WebSocket은 초기 HTTP 핸드셰이크 이후, TCP 소켓을 업그레이드하여 양방향 통신을 가능하게 한다.

서버와 클라이언트는 모두 실시간으로 데이터를 주고 받을 수 있으며, 이로 인해 채팅, 게임, 협업 도구 등에 자주 사용된다.

```tsx
const socket = new WebSocket("wss://example.com/ws");

socket.onmessage = (event) => {
  console.log("서버로부터 메시지 수신:", event.data);
};

socket.send("클라이언트 → 서버 메시지");
```

### Server-Sent Event (SSE)

SSE는 HTTP 스트리밍 방식으로, 서버가 클라이언트에게 지속적으로 데이터를 보내는 단방향 통신이다.

클라이언트는 EventSource 객체를 통해 서버에 연결하며, 서버는 text/event-stream MIME 타입으로 데이터를 전송한다.

```tsx
const source = new EventSource("/events");

source.onmessage = (event) => {
  console.log("서버로부터 이벤트 수신:", event.data);
};
```

⇒ 클라이언트는 서버로 직접 메시지를 보낼 수 없어, 일반적인 HTTP 요청이 별도로 필요하다

## 상세 비교

### 통신 방향

- WebSocket은 클라이언트와 서버가 모두 메시지를 보낼 수 있는 양방향 통신 채널을 제공한다.
- SSE는 오직 서버에서 클라이언트로의 전송만을 허용한다.

### 브라우저 및 네트워크 호환성

- SSE는 HTTP 기반이므로 Proxy, 방화벽, 로드밸런서와의 호환성이 뛰어나다.
- WebSocket은 일부 네트워크 환경에서 차단될 수 있으며, 핸드셰이크 이후 비표준 포맷을 사용한다.

### 구현 복잡도

- SSE는 단순한 브라우저 API (EventSource)로 빠르게 구현 가능하며, 이벤트 기반 구조도 직관적임
- WebSocket은 상태 관리, 연결 끊김 복구 등 추가적인 안정화 로직이 필요할 수 있다.

### 확장성, 부가 기능

- WebSocket은 바이너리 데이터 전송, 다중 채널 관리, 엔터프라이즈 실시간 애플리케이션에 적합
- SSE는 텍스트 기반 알림, 로그 스트리밍, 단순 모니터링용 실시간 데이터 등에 적합함

### 선택 기준

실시간 통신이 필요할 때 Socket 하나만 알고 있어도 구현하는데 문제는 없다.

Socket은 양방향 통신이기에 당연하게도 SSE 역할도 할 수 있다.

하지만, WebSocket과 SSE의 스펙 차이점 (배터리, 재접속 등) 때문에 사용처에 따라 선택적으로 사용되는 편이다.

예를 들어, 실시간 데이터가 필요한 곳에서

- 카카오톡과 같은 채팅
- 주식 차트 데이터
- 암호화폐 차트 데이터

SSE는 알람을 줄 때 많이 사용함

- SNS 피드를 받을 때
- 페북에서 친추 요청을 받았을 때

SSE는 주로 클라이언트에서 데이터를 받기만 하면 되고 완전히 실시간일 필요는 없을 때 사용한다.

<aside>
💡

웹소켓으로도 충분하지만, SSE만의 장점이 있기에 나뉘어 쓰인다.

SSE는 전통적인 HTTP를 통해 전송되어, 별도의 프로토콜이나 서버 구현이 필요하지 않다.

하지만, WebSocket은 프로토콜을 처리하기 위해 전이중 연결 (Full-Duplex)과 새로운 웹 소켓 서버가 필요하다.

</aside>

## 일반 HTTP, SSE의 차이점

### 통신 방향

- 일반 HTTP는 클라이언트 → 서버로의 단방향 통신이다.
- SSE는 서버 → 클라이언트로의 단방향 통신이다.

### connection : keep-alive

일반적인 HTTP(HTTP/1.1 이상 기준)는 keep-alive 속성이 자동적으로 활성화된다. 따라서 HTTP는 TCP connection을 끊지 않고 재사용한다.

하지만, 클라이언트 - 서버 간의 HTTP 연결은 요청 - 응답 이후에는 close된다.

하지만, SSE의 경우, keep-alive 속성을 명시적으로 활성화하고 `content-type: “text/event-stream”` 을 통해 브라우저가 해당 요청은 스트리밍 모드인 것을 알린다.

이를 통해 SSE는 하나의 HTTP connection을 통해 지속적인 연결을 유지하는 차이점이 있다.

# 실습

환경: node.js, index.html

```tsx
const http = require("http");

http
  .createServer((req, res) => {
    if (req.url === "/events") {
      // SSE 필수 헤더 설정
      res.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
        connection: "keep-alive",
        "access-control-allow-origin": "*",
      });

      const intervalId = setInterval(() => {
        res.write(`data: 현재 시간은 ${new Date().toLocaleTimeString()}\n\n`);
      }, 2000);

      req.on("close", () => {
        clearInterval(intervalId);
        res.end();
      });
    }
  })
  .listen(3000, () => {
    console.log("Server is running on port 3000");
  });

```

```html
<script>
  const eventSource = new EventSource("http://localhost:3000/events");

  eventSource.onmessage = (event) => {
    const newElement = document.createElement("div");
    newElement.textContent = "수신 데이터: " + event.data;
    document.body.appendChild(newElement);
  };
</script>
```

위처럼 EventSource를 사용하면 손쉽게 서버의 실시간 이벤트를 받을 수 있다.

# 참고

HTTP keep-alive에 대해 알아보기 전에 persistent connection의 기본적인 개념을 알 필요가 있다.

### Persistent Connection이란?

HTTP에 persistent connection이 필요한 이유는 무엇일까?

대표적으로 site locality가 있다.

site locality란 웹에서 특정 페이지를 보여주기 위해 서버에 연속적으로 request를 보내는 것처럼 서버에 연속적으로 동일한 클라이언트가 여러 요청을 보낼 가능성이 높은 경우를 의미한다.

위 같은 이유 때문에 HTTP/1.1부터는 HTTP 프로토콜이 TCP 연결을 요청마다 종료하지 않고 재사용 할 수 있는 방법을 제공한다.

이렇게 요청이 처리된 후에도 connection을 유지하는 경우를 `persistent connection` 이라고 표현한다. 다시 말해 persistent connection이란 통신의 주체인 서버와 클라이언트 중 하나가 명시적으로 connection을 close하거나 정책적으로 close할 때까지 계속해서 connection을 유지하는 경우를 의미한다.

### Persistent Connection의 필요성

persistent connection을 사용하게 되면 TCP 연결을 맺기 위해 SYN과 ACK을 주고 받는 3way-handshake를 매 요청마다 맺을 필요가 없어진다. 따라서, 아래와 같은 장점이 있다.

1. 네트워크 혼잡 감소: TCP, SSL/TCP connection request 수가 줄어들기 때문
2. 네트워크 비용 감소: 여러 개의 connection으로 하나의 client 요청을 serving하는 것보다 한 개의 connection으로 client 요청을 serving하는게 더 효율적이다.
3. latency 감소: 3-way handshake을 맺으면서 필요한 round-trip이 줄어들기 때문에 그만큼 latency가 감소한다.

### Persistent connection과 parallel connection의 차이

parallel connection이란 병렬적으로 동시에 여러 connection을 맺는 것을 의미한다. 물론 parallel connection은 throughput(처리량)을 늘려주긴 하지만 문제가 있다.

- 매 요청마다 새로운 connection을 open하고 close해야 하기 때문에 네트워크 연결에 더 많은 시간과 bandwidth(대역폭)이 소모된다.
- TCP slow start로 인한 성능 저하
- parallel connection을 맺을 수 있는 수의 제한

하지만 persistent connection을 활용하게 되면 connection establishment에 소모되는 비용을 줄이면서 위와 같은 문제를 완화할 수 있다.

물론 persistent connection을 활용하게 되면 connection 수립에 소모되는 비용을 줄이면서 위의 문제를 완화할 수 있다.

하지만 persistent connection을 잘못 관리하게 되면 너무 많은 idle connection이 생기게 되면서 서버에 과도한 부하가 생길 수 있다.

또한 parallel connection에 단점이 있다고 해서 persistent connection이 이를 대체하는 것이 아닌 둘을 적절히 혼용해서 사용할 수 있어야 한다.

### 그래서 HTTP keep alive란 ?

HTTP keep-alive는 위에서 설명한 persistent connection을 맺는 기법 중 하나로, HTTP/1.0+부터 지원하고 있다.

하나의 TCP connection을 활용해서 여러 개의 HTTP 요청/응답을 주고 받을 수 있게 해준다.

keep-alive 옵션은 설계 상 여러 문제점이 생기면서 HTTP/1.1부터 사용되고 있지 않는다.

기본적으로 HTTP/1.1은 persist connection을 지원하는 반면에 HTTP/1.0 connection은 하나의 request에 응답할 때마다 connection을 close하도록 설정되어있다.

`Connection: close` 인 경우, 연속적으로 여러 request를 보낼 때마다 connection을 맺었다 끊었다 해야 하는 부하가 생긴다.

하지만, keep-alive 옵션을 활용하면 persistent하게 connection을 유지할 수 있도록 하여 불필요한 연결의 맺고 끊음을 최소화시켜 네트워크 부하를 아래 사진처럼 줄일 수 있다.

![HTTP_persistent_connection](https://github.com/user-attachments/assets/fa8fc334-bf34-478b-80fd-9169a7337ad0)

### keep-alive 옵션 사용 방법

keep-alive 옵션을 통해 persistent connection을 맺기 위해서는 HTTP header에 아래와 같이 입력해야한다.

만약, 서버에서 keep-alive connection을 지원하는 경우에는 동일한 헤더를 response에 담아 보내주고, 지원하지 않으면 헤더에 담아 보내주지 않는다.

만약, 서버의 응답에 헤더가 없을 경우 client는 지원하지 않는다고 가정하고 connection을 재사용하지 않게 됨

```html
HTTP/1.1 200 OK
Connection: Keep-Alive
Keep-Alive: timeout=5, max=1000
```

1. max: keep-alive connection을 통해서 주고 받을 수 있는 request의 최대 개수. 이보다 더 많은 요청을 주고 받을 경우에는 connection은 close됨
2. timeout: 커넥션이 idle한 채로 얼마나 유지될 것인가를 의미함. timeout에 설정한 시간이 지날동안 request가 없으면 connection은 close됨

### keep-alive 관련 규칙들

1. persistent한 connection을 유지하기 위해서는 클라이언트 측에서 모든 요청에 위에서 언급한 헤더를 담아 보내야 한다. 만약, 한 요청이라도 생략될 경우 서버는 연결을 close한다
2. 서버 또한 마찬가지로 persistent하게 요청을 주고받다가 request에 keep-alive 관련 헤더가 담겨오지 않을 때는 클라이언트 측에서 persistent connection을 맺고 있지 않다고 판단할 수 있음
3. 정확한 Content-length를 사용해야 한다. 하나의 connection을 계속 재사용하는 데, 특정 요청의 종료를 판단할 수 없기 때문이다.
4. Connection 헤더를 지원하지 않는 Proxy에는 사용할 수 없다.
5. 클라이언트는 언제든 connection이 close될 수 있기 때문에 retry로직을 준비해두는 것이 좋다

### keep-alive와 proxy에서 발생하는 문제 : blind relays

<img width="355" height="142" alt="download" src="https://github.com/user-attachments/assets/b0b60b7c-ef08-4039-8a39-1c05b64acfda" />

서버와 클라이언트가 proxy 없이 직접 통신할 경우 keep-alive 옵션이 정상 동작할 수 있지만, 만약 blind relay, 즉 keep-alive 옵션을 지원하지 않는 proxy는 Connection header를 이해하지 못하고 그냥 extension header로 인식하는 경우에는 제대로 동작하지 않는다.

위 사진에서 (b) 단계 blind relay proxy가 서버 측에 HTTP Connection Keep Alive header를 보낼 경우에, 서버는 proxy가 keep-alive를 지원하는 것으로 오인하게 된다.

따라서 서버는 proxy와 헤더에 입력된 규칙으로 통신을 시도한다.

그리고 proxy는 서버가 보낸 header를 그대로 client에 전달하지만 keep-alive 옵션을 이해하지 못하기 때문에, 클라이언트-서버가 connection을 close하기를 대기한다. 하지만 client는 response에서 keep-alive 관련 헤더가 넘어왔기 때문에 persistent connection이 맺어진 줄 알고 close하지 않게 된다.

따라서, 이 경우 proxy가 connection이 close될 때까지 hang하게 된다.

또한 client는 동일한 connection에 request를 보내지만 proxy는 이미 close된 connection이기에 해당 요청을 무시한다. 이때 client 혹은 server에서 설정한 timeout이 발생할 때까지 hang이 발생한다.

따라서, HTTP/1.1부터는 proxy에서 persistent connection header를 전달하지 않는다.

persistent connection을 지원하는 proxy에서는 대안으로 `Proxy Connection` 헤더를 활용하여 proxy에서 자체적으로 keep-alive를 사용한다고 한다.

### Keep-alive의 대안: HTTP/1.1

HTTP/1.0의 문제를 해결하기 위해 HTTP/1.1부터는 다른 방식을 제공한다.

HTTP/1.1부터는 모든 connection에 별도의 설정이 있지 않으면 persistent connection을 맺는다. HTTP/1.1 어플리케이션들은 connection을 close하기 위해 명시적으로 `Connection: close` 헤더를 입력해야 한다.

클라이언트는 별도의 `Connection: close` 헤더가 있지 않는 한 서버가 응답한 뒤에 계속해서 재사용할 수 있다고 가정한다. 물론 별도로 보내지 않더라도 서버나 클라이언트 측에서 connection을 종료할 수 있다.

### HTTP/1.1의 persistent connection 관련 규칙들

1. 클라이언트 측에서 `Connection: close` 헤더를 보낸 뒤에는 해당 커넥션을 재사용할 수 없다.
2. 클라이언트가 더 이상 connection을 재사용하고 싶지 않을 경우에는 `Connection : close` 헤더를 마지막 요청에 같이 보내야 한다.
3. connection이 계속해서 persistent하게 유지되기 위해서는 모든 요청에 오류가 없어야 한다. content-length가 다르다던지 encoding되지 않았다던지 하면 유지되지 않는다.
4. 클라이언트는 언제든 connection이 close될 수 있기에 retry 로직을 준비해두는 것이 좋다
