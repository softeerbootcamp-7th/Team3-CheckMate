# EventSource, Fetch로 SSE 구현하기

# 서버로부터 이벤트 수신하기

Server-sent event A PI는 EventSource 인터페이스에 포함되어 있다.

## EventSource란?

`EventSource` 인터페이스는 웹 콘텐츠가 Server Sent Event에 응답하는 인터페이스이다.

EventSource 인스턴스는 HTTP `EventSource` 서버와 영구적인 연결을 열고, 서버는 `text/event-stream` 형식으로 이벤트를 전송한다. 이 연결은 `EventSource.close()` 를 호출하여 닫을 때까지 계속 지속된다.

웹소켓과 달리 Server-Server-Event는 서버 → 클라이언트 단방향 통신이다.

따라서, SSE는 클라이언트에서 서버로 데이터를 보낼 필요가 없을 때 아주 좋은 선택지가 된다.

<aside>
💡

HTTP/2를 사용하지 않으면, 브라우저 당 SSE Connection 최대 개수가 매우 작다. (최대 6개까지만 연결가능)

즉, 하나의 브라우저에서 특정 도메인에 대해 최대 6개만 연결할 수 있다.

크롬 [www.example1.com](http://www.example1.com) → 최대 6개

        [www.example2.com](http://www.example2.com) → 최대 6개

만약, HTTP/2를 사용한다면, HTTP/2 스트림 한도(MAX_CONCURRENT_STREAMS) 협상 결과(브라우저/서버 구현, 서버 설정 포함)로 결정된다. (기본값 100개)

</aside>

### Constructor

`EventSource()` 

EventSource 지정된 URL에서 전송된 Server Sent Event를 수신하는 새 객체를 생성한다.

이때, credentials mode를 설정할 수 있다.

### EventSource 인스턴스 속성

`EventSource.readyState`

EventSource의 연결 상태를 나타낸다.

- CONNECTING (0)
- OPEN (1)
- CLOSED (2)

`EventSource.url`

SSE의 source에 대한 url을 나타낸다.

`EventSource.withCredentials`

EventSource의 cross-origin (CORS)를 허용할 지에 대한 플래그 변수

### EventSource 인스턴스 메서드

`EventSource.close()`

SSE 연결을 닫고 해당 EventSource 인스턴스의 `readyState` 를 `CLOSED` 로 설정한다.

만약, SSE 연결이 이미 닫혔다면 아무 일도 하지 않는다.

### EventSource 관련 Event

`error`

SSE 연결 실패 시 (open) 발생하는 이벤트

`message` 

SSE 연결 후 SSE 수신 시 발생하는 이벤트

`open`

SSE 연결 수립 시 발생하는 이벤트

## EventSource 관련 예시

[https://codesandbox.io/p/devbox/2dctw8](https://codesandbox.io/p/devbox/2dctw8)

## fetch()로 SSE 통신하기

EventSource는 `credential` 설정 말고는 별도의 header 커스텀 기능등을 제공하지 않는다.

<aside>
💡

EventSource는 왜 헤더 커스텀을 지원하지 않을까 ?

공식적인 글은 없지만, SSE는 서버 → 클라이언트 방향 스트리밍을 매우 간단하게 하기 위해 설계된 API라서, HTTP 요청 커스터마이징은 처음부터 고려되지않았다는 의견과

아래 사진처럼 fetch()라는 상위 호환 WEB API를 고도화하는 것이 legacy인 EventSource의 기능을 고도화하는 것보다 났다는 의견이 있다.

<img width="938" height="208" alt="image" src="https://github.com/user-attachments/assets/6d5e8bf9-1018-44f9-bb25-9e2cd0dc71d4" />

<img width="1087" height="429" alt="image 1" src="https://github.com/user-attachments/assets/d3452c92-a659-4319-992e-0f0a7860b425" />



위 사진은 https://github.com/whatwg/html/issues/2177 해당 issue에서 확인할 수 있다.

</aside>

만약, SSE 연결을 할 때, access token을 헤더로 전달해야 하는 경우는 어떡할까 ? 또 GET 메서드 말고 다른 메서드를 활용해야할 때는 어떻게 해야할까 ?

이때는 EventSource를 쓰기 보다 `fetch()`와 `ReadableStream` 을 활용하여 SSE를 구현할 수 있다.

또한, 기존 EventSource의 기능을 유지하면서 기능이 더 추가된 라이브러리 등을 사용할 수 있도 있다.

- [**fetch-event-source**](https://github.com/Azure/fetch-event-source)
- [**EventSource**](https://github.com/Yaffle/EventSource)

직접 fetch로 구현한다면 다음과 같이 작성할 수 있다.

### 직접 구현해보기

fetch() api 실행으로 반환받는 `ReadableStream<Uint8Array>` 형태의 body가 존재한다.

ReadableStream은 해당 배열을 통해 데이터를 읽을 수 있는 스트림을 나타내며, 주로 네트워크 요청, 파일 읽기, 웹 소켓 등과 같은 비동기 작업에서 사용된다.

`getReader()`는 스트림 데이터 읽기를 세밀하게 제어해야 할 때 할 때 사용한다

대용량 파일 처리나 데이터가 도착할 때마다 처리해야 하는 경우에 특히 유용하다

`Uint8array` 는 8비트 부호 없는 정수(바이트) 배열을 나타내며, 주로 이진 데이터를 나타내는 데 사용함

따라서, `ReadableStream<Uint8Array>` 란 데이터가 스트림의 형태로 비동기적으로 전달되고 이는 데이터가 조각으로 나눠서 도착할 수 있음을 의미한다.

스트림 데이터가 비동기적으로 도착하므로 데이터를 읽는 코드도 비동기적으로 작성해야 한다.

아래와 같이 작성할 수 있다.

```tsx
fetch(url, {
	method: 'GET' | 'POST' 등등..
	header: { 
	'Content-Type': 'application/json; charset=utf-8',
	'Accept': 'text/event-stream',
	'Cache-Control': 'no-cache',
	'Connection': 'keep-alive'
	},
	// body: ...
})
.then((response) => {
	return response.body;
})
.then((body) => {
	// body <= ReadableStream<Uint8Array>
	const reader = body?.getReader();
	
	while (true) {
		const { done, value } = await reader.read();
		if (done) {
			break;
		}
		
		console.log(value);
		
		const decoder = new TextDecoder();
		const decodedData = decoder.decode(value);
		
	}
})
```

SSE 데이터는 아래 구조처럼 온다.

```
event: message\n
data: Hello, world!\n
\n\n
event: update\n
data:50%\n
\n\n
```

<img width="473" height="381" alt="image 2" src="https://github.com/user-attachments/assets/984f0b4c-e5d0-40e6-b5a5-e4fd29c0d685" />

따라서 위 구조를 반영해서 다음과 같이 fetch() SSE client를 만들 수 있다.

러프하게 작성하면 아래와 같다.

```jsx
const customSse = async (requestInit) => {
        const signal = requestInit?.signal;
        const response = await fetch("/events", {
          method: "GET",
          headers: {
            Accept: "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
          ...requestInit,
        });

        if (!response.body) {
          throw new Error("SSE response body is empty");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        let buffer = "";

				// abort시 reader를 중단하도록
        const onAbort = () => {
          reader.cancel().catch(() => {});
        };
        signal?.addEventListener("abort", onAbort);

        try {
          while (true) {
            if (signal?.aborted) break;

						// 스트림이 끝날 때까지 read
            const { done, value } = await reader.read();
            if (done) break;

						// buffer에 decoder를 통해 decoding된 문자열을 이어붙임
            buffer += decoder.decode(value, { stream: true });

            let delimiterIndex;
            // \n\n 기준으로
            while ((delimiterIndex = buffer.indexOf("\n\n")) !== -1) {
	            // 버퍼를 \n\n로 슬라이스
              const rawEvent = buffer.slice(0, delimiterIndex).trim();
              buffer = buffer.slice(delimiterIndex + 2);
              if (!rawEvent) continue;
              
							// 이벤트는 \n로 나눠짐
              const lines = rawEvent.split("\n");
              let eventType = "message";
              let data = "";
              let id = undefined;

              for (const line of lines) {
                if (line.startsWith("event:")) {
                  eventType = line.replace("event:", "").trim();
                } else if (line.startsWith("data:")) {
                  data += line.replace("data:", "").trim() + "\n";
                } else if (line.startsWith("id:")) {
                  id = line.replace("id:", "").trim();
                }
              }

              console.log(eventType, data, id);
              if (data !== "") {
              // 여기서 event 관련 로직을 처리한다
                log(`${eventType}: ${data.trim()}`);
              }
            }
          }
        } catch (error) {
          if (signal?.aborted || error?.name === "AbortError") {
            return;
          }
          throw error;
        } finally {
          signal?.removeEventListener("abort", onAbort);
          try {
            reader.releaseLock();
          } catch (_) {}
        }
      };
```

### fetch 예제

[https://codesandbox.io/p/devbox/ftdppy?embed=1&file=%2Findex.html](https://codesandbox.io/p/devbox/ftdppy?embed=1&file=%2Findex.html)

# 실제 Checkmate에서 사용한 fetch 기반 SSE

`azure/fetch-event-source` 와 해당 레포지토리 issue에 나열된 문제를 보완하여 만들었습니다.

```jsx
import { API_BASE_URL } from '@/constants/shared';
import type { EventSourceMessage } from '@/types/shared';
import { parseRawEvent } from '@/utils/shared';

import { postAuthRefresh } from '../auth';

import { ApiError, createApiError, isApiError } from './apiError';
import { authToken } from './authToken';

const DEFAULT_RETRY_INTERVAL = 1000;
const DEFAULT_SSE_CONTENT_TYPE = 'text/event-stream';

const defaultOnOpen = async (response: Response) => {
  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    // SSE ERROR 클래스를 만들지 논의 필요
    throw await createApiError(response);
  }

  if (!response.body) {
    throw new ApiError('Response body is empty', 500, 'RESPONSE_BODY_EMPTY');
  }

  if (!contentType?.startsWith(DEFAULT_SSE_CONTENT_TYPE)) {
    throw new Error(
      `Expected SSE content type to be ${DEFAULT_SSE_CONTENT_TYPE}, but got ${contentType}`,
    );
  }
};

interface SseClientOptions extends RequestInit {
  /**
   * 메세지를 수신한 후 호출되는 콜백, 기본 브라우저 EventSource의 onmessage와 다르게 모든 이벤트에 대해 호출됨
   */
  onmessage?: (message: EventSourceMessage) => void;

  /**
   * response가 끝난 후 호출되는 콜백, 서버가 연결을 끊지 않길 원하면 exception을 throw하여 retry를 위한 onerror를 트리거할 수 있음
   */
  onclose?: () => void;

  /**
   * request 생성, 메세지 처리, 콜백 실행 등에서 request 생성에러가 발생 시 호출됨
   * retryInterval과 함께 사용하면 에러 알림 후 retry를 수행
   */
  onerror?: (err: unknown) => void;

  /**
   * 에러 발생 시 retry interval(ms)을 반환하는 콜백
   * 정의하면 반환된 interval 후 자동으로 재연결을 시도함
   * retry 로직을 설계하는 것이 좋음: 치명적 에러는 rethrow, 그렇지 않으면 interval 반환하여 마지막으로 수신한 event에 대해 자동으로 retry를 수행할 수 있음
   */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  retryIntervalFn?: (err: unknown) => number | null | undefined | void;

  /**
   * 브라우저가 숨겨진 상태에서도 연결을 유지하길 원하면 true로 설정
   */
  openWhenHidden?: boolean;
}

/**
 * @link https://github.com/Azure/fetch-event-source/blob/main/src/fetch.ts
 */
export const sseClient = (
  url: RequestInfo,
  {
    headers: customHeaders,
    signal: customSignal,
    onmessage,
    onclose,
    onerror,
    retryIntervalFn,
    openWhenHidden,
    ...rest
  }: SseClientOptions,
) => {
  return new Promise<void>((resolve, reject) => {
    const headers = new Headers({
      ...customHeaders,
      Authorization: `Bearer ${authToken.get()}`,
    });

    if (!headers.has('Accept')) {
      headers.set('Accept', DEFAULT_SSE_CONTENT_TYPE);
    }

    let currentRequestAbortController: AbortController = new AbortController();

    const onVisibilitychange = () => {
      currentRequestAbortController.abort();
      if (!document.hidden) {
        // 연결 재시작
        create();
      }
    };

    if (!openWhenHidden) {
      document.addEventListener('visibilitychange', onVisibilitychange);
    }

    let retryInterval = DEFAULT_RETRY_INTERVAL;
    let retryTimer = 0;

    const dispose = () => {
      document.removeEventListener('visibilitychange', onVisibilitychange);
      window.clearTimeout(retryTimer);
      if (!currentRequestAbortController.signal.aborted) {
        currentRequestAbortController.abort();
      }
    };

    customSignal?.addEventListener('abort', () => {
      dispose();
      // 외부에서 주입된 신호에 의해 종료되었으므로 성공 처리 (따로 에러 처리 X)
      // https://github.com/Azure/fetch-event-source 참고
      resolve();
    });

    const fetch = window.fetch;

    /**
     * response를 받은 후, response의 validation을 수행하기 위해 사용되는 콜백
     */
    const onopen = defaultOnOpen;

    /**
     * SSE 연결 생성
     */
    async function create() {
      const currentController = new AbortController();
      currentRequestAbortController = currentController;
      try {
        const apiPath = `${API_BASE_URL}${url}`;

        const response = await fetch(apiPath, {
          ...rest,
          headers,
          credentials: 'include',
          cache: 'no-store',
          signal: currentController.signal,
        });

        await onopen(response);

        const reader = response.body?.getReader();

        if (!reader) {
          throw new Error('Reader is not found');
        }

        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });

          let delimiterIndex: number;
          while ((delimiterIndex = buffer.indexOf('\n\n')) !== -1) {
            const rawEvent = buffer.substring(0, delimiterIndex);
            buffer = buffer.substring(delimiterIndex + 2);
            if (rawEvent) {
              const message = parseRawEvent(rawEvent, (retry) => {
                retryInterval = retry;
              });

              if (message && onmessage) {
                onmessage(message);
              }
            }
          }
        }
        reader.releaseLock();
        onclose?.();
        dispose();
        resolve();
      } catch (error) {
        if (!currentController.signal.aborted) {
          // 401 에러 시 토큰 갱신 후 재시도 (retryIntervalFn 유무와 무관)
          if (isApiError(error) && error.status === 401) {
            await postAuthRefresh()
              .then(({ accessToken }) => {
                authToken.set(accessToken);
                headers.set('Authorization', `Bearer ${accessToken}`);
                window.clearTimeout(retryTimer);
                retryTimer = window.setTimeout(create, DEFAULT_RETRY_INTERVAL);
              })
              .catch((err) => {
                dispose();
                reject(err);
              });
            return;
          }

          if (retryIntervalFn) {
            // retryInterval이 정의된 경우: onerror 알림 후 재시도
            onerror?.(error);
            const interval = retryIntervalFn(error) ?? retryInterval;
            window.clearTimeout(retryTimer);
            retryTimer = window.setTimeout(create, interval);
          } else {
            // retryInterval이 없는 경우: onerror 알림 후 연결 종료
            onerror?.(error);
            dispose();
            reject(error);
          }
        }
      }
    }
    create();
  });
};

```