# Shared Worker를 통해 SSE 연결 관리하기

# 문제사항

SSE를 통해 서버와 통신을 하게 되면, 브라우저의 탭이 열릴 때마다 connection이 생기게 된다. Checkmate 프로젝트의 경우, http 1.1을 사용 중이기에 브라우저당 하나의 도메인에서 최대 6개(크롬, 파이어폭스 기준)까지만 SSE 연결이 가능하기에 잠재적으로 문제를 일으킬 수 있는 이슈 중 하나였다.

<img width="839" height="688" alt="image" src="https://github.com/user-attachments/assets/c0ace7ea-48de-4f98-aa39-4979d9f9dbb7" />

또 다른 문제사항은 서버에서 같은 매장에 대해 이미 SSE 연결이 되어 있는 상태로 또다른 SSE 연결을 하게 되면 (ex. 새로운 탭을 연 상황) 기존 SSE 연결을 끊고 새롭게 연결된 탭과 SSE 연결을 하게 된다.

위 상황의 경우, 사용자가 2개 이상의 탭을 띄웠을 때, 주문 발생 시 하나의 탭만 실시간으로 업데이트되므로 UX를 저하시킨다.

이런 상황을 극복하고자 다양한 참고 자료를 찾던 중, [토스 | SLASH 24 - N개의 탭, 하나의 소켓](https://www.youtube.com/watch?v=SVt1-Opp3Wo) 이란 영상을 찾았고 해당 영상을 참고하여 Shared Worker를 통해 문제를 해결할 수 있었다.

Shared Worker를 바로 적용하기 전에 관련해서 학습을 한 뒤 진행했다.

([Dedicated Worker, Shared Worker 학습 정리](https://github.com/softeerbootcamp-7th/WEB-Team3-CheckMate/wiki/DedicatedWorker,-SharedWorker))

# SharedWorker를 통한 SSE 아키텍처 변경

Shared Worker는 윈도우 창이나 탭, iframe, 워커 등의 다른 브라우징 컨텍스트에서도 접근할 수 있다. 물론 동일 출처(same-origin)에 탭/컨텍스트에서만 SharedWorker를 공유할 수 있다.

<aside>
💡

브라우징 컨텍스트는 브라우저가 Document를 표시하는 환경을 말한다. 오늘날에는 보통 탭을 지칭하지만, 브라우저 창이나 페이지 내의 프레임도 가능하다.

</aside>

이를 활용해 Shared Worker에서 SSE 연결을 생성하여 브라우저 탭을 여러 개 띄어도 하나의 SSE 연결 유지할 수 있도록 했다.

<img width="995" height="613" alt="image 1" src="https://github.com/user-attachments/assets/87523844-a11b-4ee9-b951-c0bdd8b29660" />

첨부한 사진 속 구조로 개선하고자 했다.

# SharedWorker를 사용하여 개선 작업 진행

## 개선한 구조

먼저, 구현에 앞서 SharedWorker를 사용했을 때의 구조를 그려보았다.

<img width="1553" height="842" alt="image 2" src="https://github.com/user-attachments/assets/d6b1be04-fe2d-4ddf-aaf8-ca26c66ee103" />

SharedWorker가 SSE의 진입점이 되어 서버에서 보낸 Event를 연결된 각 브라우저 탭으로 해당 Event Message를 전달하는 방식이다.

하지만 문제가 발생했다.

기존에는 각 대시보드 페이지의 탭 별로 가지고 있는 지표 카드에 대해 구독 요청을 보내고, 각 탭이 unmount될 때 구독 해제 요청을 보내는 방식이었다.

위 사진을 예시로 들어보면 아래와 같은 문제가 생긴다.

1. 탭1 대시보드: 지표카드1, 지표카드2, 지표카드3, 탭2 대시보드: 지표카드2, 지표카드3, 지표카드4를 구독하고 있다.
2. 탭1의 대시보드가 언마운트된다 → 지표카드1, 지표카드2, 지표카드3을 구독해제하는 API 요청을 보낸다
3. 서버 측에서 구독하고 있는 지표카드들 중 지표카드1, 지표카드2, 지표카드3을 모든 해제한다.
4. 탭2의 대시보드에서 지표카드2, 지표카드3에 대한 실시간 정보를 받을 수 없는 문제가 발생

따라서, 지표카드 구독에 대한 로직도 개선이 필요했다.

## 대시보드 지표 카드 구독 로직 변경

<img width="1221" height="260" alt="image 3" src="https://github.com/user-attachments/assets/cebfd33c-8003-4892-8bdb-3b8f614dc1f5" />

기존 대시보드 지표 카드 구독 로직은 위와 같았다.

위 구조는 앞써 말했던 문제가 발생했다. 물론 백엔드 분께 요청해서 서버 로직을 변경해도 되는 문제였지만 백엔드 측 공수가 부족해서 프론트에서 처리하기로 합의했다.

<img width="1423" height="910" alt="image 4" src="https://github.com/user-attachments/assets/37b753c2-192d-46e0-9499-a5d417e4ae8a" />

따라서, 각 탭에서 구독 관련 API를 서버로 직접 보내는 기존 파편화된 로직을 각 탭에서는 SharedWorker로 구독, 구독 해제에 대한 메세지를 보내고, SharedWorker에서 지표 카드에 대한 구독 정보를 관리하여 구독, 구독 API를 서버로 요청하는 중앙화된 방식으로 구조를 개선했다.

# SSE 연결 로직 구현

위에서 개선할 구조를 정리했으니 이제 로직을 구현할 차례다.

대시보드에서 실시간 데이터를 수신하기 위해서는 아래의 순서대로 동작해야 한다.

1. SSE 연결
2. 지표 카드 구독
3. SSE를 통한 실시간 이벤트 수신
4. (언마운트 시)지표 카드 구독 해제

위 순서대로 동작하는 로직을 구현했다.

## 메인 스레드와의 연결

먼저, SharedWorker에서 연결된 메인스레드의 Port를 관리하는 코드를 작성했다.

```tsx
// 메인스레드와 연결된 Port 리스트
const ports: MessagePort[] = [];

// 탭별 구독하는 지표 코드 목록 매핑
const portMetricCodeMap = new Map<MessagePort, Set<MetricCardCode>>();

// 현재 브라우저에서 구독하는 지표 카운트 맵
const metricCodeSubscriptionMap = new Map<MetricCardCode, number>();

const ctx: SharedWorkerGlobalScope = self as unknown as SharedWorkerGlobalScope;

ctx.onconnect = (event: MessageEvent) => {
  const port = event.ports[0];
  ports.push(port);
  portMetricCodeMap.set(port, new Set());

  // 연결 시작
  port.start();

  port.onmessage = async (
    event: MessageEvent<DashboardSsePortToWorkerMessage>,
  ) => {
    // 메인스레드에서 수신한 메세지 처리
  };
};
```

## SharedWorker에서 SSE 연결

기존에 구현한 fetch 기반 sseClient는 window 객체를 사용하여 Worker 환경에서는 사용할 수 없는 문제도 있고 연결된 Port가 있을 때만 SSE 연결 유지하거나 각 이벤트마다 분기처리가 필요하여 기존 sseClient를 사용하기 보다 Worker 전용 sse client를 만들어서 구현했다.

이때, 여러 개의 탭에서 동시에 SSE 접속 요청을 보내는 race condition이 발생해서 SSE 연결 상태를 저장하는 변수를 만들어서 동시에 연결 요청을 하는 경우를 방지하고자 했다.

```tsx
const CONNECTION_STATUS: {
    PREPARE: 0,
    CONNECTING: 1,
    CONNECTED: 2,
    DISCONNECTED: 3,
  } as const,

let connectionStatus: ValueOf<typeof CONNECTION_STATUS> =
  CONNECTION_STATUS.PREPARE;

// SSE 연결 함수
const createSseClient = () => {
  // Connection Status에서 따른 연결 처리
}

ctx.onconnect = (event: MessageEvent) => {
  const port = event.ports[0];
  ports.push(port);
  portMetricCodeMap.set(port, new Set());

  if (connectionStatus === CONNECTION_STATUS.CONNECTED) {
    port.postMessage({
      type: DASHBOARD_SSE_EVENT.CONNECT,
    });
  } else {
    createSseClient().catch(onerror);
  }

  port.start();

  port.onmessage = async (
    event: MessageEvent<DashboardSsePortToWorkerMessage>,
  ) => {
    // message 관련 처리
  };
};
```

- `createSseClient()` 전체 코드

```tsx
const createSseClient = () => {
  return new Promise<void>((resolve, reject) => {
    if (
      connectionStatus === CONNECTION_STATUS.CONNECTED ||
      connectionStatus === CONNECTION_STATUS.CONNECTING
    ) {
      return resolve();
    }

    connectionStatus = CONNECTION_STATUS.CONNECTING;

    const headers = new Headers({
      Authorization: `Bearer ${accessToken ?? authToken.get()}`,
    });

    if (!headers.has('Accept')) {
      headers.set('Accept', 'text/event-stream');
    }

    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const dispose = () => {
      retryCount = 0;
      connectionStatus = CONNECTION_STATUS.PREPARE;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
      if (!currentRequestAbortController.signal.aborted) {
        currentRequestAbortController.abort();
      }
    };

    const create = async () => {
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
      // 이미 SSE 연결이 생성된 경우 return
      if (connectionStatus === CONNECTION_STATUS.CONNECTED) {
        resolve();
        return;
      }

      const currentController = new AbortController();
      currentRequestAbortController = currentController;

      try {
        const response = await fetch(`${API_BASE_URL}/api/sse/connection`, {
          headers,
          signal: currentController.signal,
        });

        // 응답 상태 코드가 200이 아닌 경우 에러 throw
        if (!response.ok) {
          throw await createApiError(response);
        }

        connectionStatus = CONNECTION_STATUS.CONNECTED;

        const reader = response.body?.getReader();

        if (!reader) {
          throw new Error('Reader is not found');
        }

        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        // SSE 연결 유지를 위해 무한 루프 (스트리밍)
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
              const message = parseRawEvent(rawEvent);

              broadcastMessage(message);
            }

            // 연결된 탭이 없는 경우, SSE 연결 해제 후 연결 상태 초기화
            if (allPortsDisconnected()) {
              connectionStatus = CONNECTION_STATUS.DISCONNECTED;
              currentRequestAbortController.abort();
              dispose();
              resolve();
              return;
            }
          }
        }
        reader.releaseLock();
        connectionStatus = CONNECTION_STATUS.DISCONNECTED;

        // 연결된 탭이 있는 경우, 대시보드 SSE는 항상 연결되어야 함 -> 연결 해제 시 에러를 throw하여 연결 재시도
        if (!allPortsDisconnected()) {
          onclose();
        }
        dispose();
        resolve();
      } catch (error) {
        // SSE 연결 해제 후 연결 상태 초기화
        connectionStatus = CONNECTION_STATUS.DISCONNECTED;
        if (!currentController.signal.aborted) {
          // 401 에러 시 토큰 갱신 후 재시도 (retryIntervalFn 유무와 무관)
          if (isApiError(error) && error.status === 401) {
            await postAuthRefresh()
              .then(({ accessToken }) => {
                authToken.set(accessToken);
                headers.set('Authorization', `Bearer ${accessToken}`);
                if (retryTimer) {
                  clearTimeout(retryTimer);
                }
                if (!allPortsDisconnected()) {
                  retryTimer = setTimeout(create, RETRY_INTERVAL);
                } else {
                  dispose();
                  resolve();
                }
              })
              .catch((err) => {
                dispose();
                reject(err);
              });
            return;
          }

          // onerror 호출 후 재시도
          onerror?.(error);
          const interval = retryIntervalFn();
          if (retryTimer) {
            clearTimeout(retryTimer);
          }
          if (!allPortsDisconnected() && retryCount <= MAXIMUM_RETRY_COUNT) {
            retryTimer = setTimeout(create, interval);
          } else {
            dispose();
            resolve();
          }
        } else {
          // retryInterval이 없는 경우: onerror 알림 후 연결 종료
          onerror?.(error);
          dispose();

          // abort된 경우, 정상 종료 처리
          resolve();
          return;
        }
      }
    };

    create();
  });
};
```

## SharedWorkerProvider

기본적인 SharedWorker의 틀과 SSE 연결 구조가 잡혔으니 메인스레드에서 SharedWorker를 호출하는 코드를 구현했다.

해당 Worker는 DashboardPage에서 활용되므로 `DashboardSseWorkerProvider` 다음과 같은 Provider를 만들었다.

DashboardSseWorkerContext의 구조는 다음과 같다.

```tsx
import { createContext } from 'react';

import type {
  DashboardSsePortToWorkerMessage,
  DashboardSseWorkerToPortMessage,
} from '@/types/dashboard';

interface DashboardSseWorkerContextType {
  // Worker의 메시지를 구독하는 함수
  subscribeMessage: (
    listener: (message: MessageEvent<DashboardSseWorkerToPortMessage>) => void,
  ) => () => void;
  // Worker에 메시지를 보내는 함수
  postMessage: (message: DashboardSsePortToWorkerMessage) => void;
}

export const DashboardSseWorkerContext = createContext<
  DashboardSseWorkerContextType | undefined
>(undefined);
```

DashboardSseWorkerProvider의 구조는 다음과 같다.

옵저버 패턴을 활용하여 Worker에서 SSE event를 메시지로 송신했을 때, message로 인한 리렌더링을 방지하기 위해 `const [message, setMessage] = useState('')` 와 같이 상태를 활용하는 것이 아닌 Worker의 메시지를 각 컴포넌트들이 구독하고 Worker에 메세지를 수신했을 `emitMessage()` 를 통해 구독 중 컴포넌트들에게 메세지에 따른 로직을 수행할 수 있도록 설정했다.

```tsx
import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  DASHBOARD_SSE_EVENT,
  DASHBOARD_SSE_SHARED_WORKER,
  DashboardSseWorkerContext,
} from '@/constants/dashboard';
import DashboardSseDedicatedWorker from '@/services/dashboard/sse/dashboardSseDedicatedWorker?worker';
import DashboardSseSharedWorker from '@/services/dashboard/sse/dashboardSseSharedWorker?sharedworker';
import { authToken } from '@/services/shared';
import type {
  DashboardSsePortToWorkerMessage,
  DashboardSseWorkerToPortMessage,
} from '@/types/dashboard';

export const DashboardSseWorkerProvider = ({ children }: PropsWithChildren) => {
  const sseWorkerRef = useRef<SharedWorker | Worker | null>(null);
  const heartbeatIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const sseWorkerMessageSubscriber = useRef(
    new Set<(message: MessageEvent<DashboardSseWorkerToPortMessage>) => void>(),
  );

  const { PING_INTERVAL } = DASHBOARD_SSE_SHARED_WORKER;

  const emitMessage = useCallback(
    (message: MessageEvent<DashboardSseWorkerToPortMessage>) => {
      sseWorkerMessageSubscriber.current.forEach((subscriber) =>
        subscriber(message),
      );
    },
    [],
  );

  const subscribeMessage = useCallback(
    (
      listener: (
        message: MessageEvent<DashboardSseWorkerToPortMessage>,
      ) => void,
    ) => {
      sseWorkerMessageSubscriber.current.add(listener);
      return () => {
        sseWorkerMessageSubscriber.current.delete(listener);
      };
    },
    [],
  );

  const postMessage = useCallback(
    (message: DashboardSsePortToWorkerMessage) => {
      const sseWorker = sseWorkerRef.current;
      if (sseWorker instanceof Worker) {
        sseWorker.postMessage(message);
      } else if (sseWorker instanceof SharedWorker) {
        sseWorker.port.postMessage(message);
      }
    },
    [],
  );

  useEffect(() => {
    const sharedWorker = new DashboardSseSharedWorker();
    sseWorkerRef.current = sharedWorker;

    sharedWorker.port.onmessage = (
      event: MessageEvent<DashboardSseWorkerToPortMessage>,
    ) => {
      emitMessage(event);
    };
    sharedWorker.port.start();
    postMessage({
      type: DASHBOARD_SSE_EVENT.CONNECT,
      data: {
        authToken: authToken.get() ?? '',
      },
    });
  }, [emitMessage, postMessage]);

  const value = useMemo(
    () => ({ subscribeMessage, postMessage }),
    [subscribeMessage, postMessage],
  );

  return (
    <DashboardSseWorkerContext.Provider value={value}>
      {children}
    </DashboardSseWorkerContext.Provider>
  );
};
```

위 Provider에서 제공하는 context를 소비하는 컴포넌트에서는 다음과 같이 작성하면 Worker에서 송신한 SSE Event에 따른 로직을 처리할 수 있다.

```tsx
const { subscribeMessage, postMessage } = useDashboardSseWorkerContext();

useEffect(() => {
  return subscribeMessage((message) => {
    const { data } = message;
    const { type, data: messageData } = data;
    switch (type) {
      case DASHBOARD_SSE_EVENT.MESSAGE:
        handleSseMessage(messageData);
        break;
      case DASHBOARD_SSE_EVENT.CONNECT:
        isSseConnectedRef.current = true;
        subscribeCardList();
        break;
    }
  });
}, [subscribeMessage, handleSseMessage, subscribeCardList]);
```

위와 같은 방식으로 SharedWorker에서 SSE 연결을 진행하고 워커와 연결된 브라우저들에게 SSE 이벤트를 broadcast하는 구조를 구현할 수 있다.

## 지표카드 구독, 구독 해제 로직

지표 카드 구독, 구독 해제 로직은 다음과 같다.

1. 브라우저 탭(대시보드)에서 `SharedWorker`로 부터SSE 연결 성공 메세지를 수신한다.
2. 브라우저 탭이 `SharedWorker`에 대시보드에 있는 지표 카드 목록들과 함께 `subscribe`라는 메시지를 송신한다.
3. `SharedWorker`에서 관리하는 지표카드 구독 정보 Map에 해당 카드들을 추가한다.
   1. 만약, Map에 없던 카드라면, 배열에 저장 후 한번에 구독 API 요청을 한다.
4. 브라우저 탭이 대시보드 페이지에서 벗어난다면, `SharedWorker` 에 지표 카드 목록들 `unsubscribe` 라는 메시지를 송신한다.
5. `SharedWorker`에서 관리하는 지표카드 구독 정보 Map에 해당 카드들을 제거하거나, -1 한다.
   1. 만약, 구독횟수가 0이 되는 카드라면 배열에 저장 후 한번에 구독 해제 API 요청을 한다.

```tsx
/**
 * 지표 카드 구독 처리
 */
const handleSubscribe = async (topics: MetricCardCode[], port: MessagePort) => {
  const cardForSubscription: MetricCardCode[] = [];

  topics.forEach((topic) => {
    portMetricCodeMap.get(port)?.add(topic);
    const subscriptionCount = metricCodeSubscriptionMap.get(topic);
    if (!subscriptionCount) {
      metricCodeSubscriptionMap.set(topic, 1);
      cardForSubscription.push(topic);
    } else {
      metricCodeSubscriptionMap.set(topic, subscriptionCount + 1);
    }
  });

  if (cardForSubscription.length > 0) {
    await authorizedApi.post('/api/sse/subscriptions', {
      body: JSON.stringify({
        topics: cardForSubscription,
      }),
    });
  }
};

/**
 * 지표 카드 구독 취소 처리
 */
const handleUnsubscribe = async (
  topics: MetricCardCode[],
  port: MessagePort,
) => {
  const cardForUnSubscription: MetricCardCode[] = [];

  const unsubscribedCardCodes = unsubscribeMetricCard(cardForUnSubscription);
  topics?.forEach((metricCode) => {
    portMetricCodeMap.get(port)?.delete(metricCode);
    unsubscribedCardCodes(metricCode);
  });

  if (cardForUnSubscription.length > 0) {
    await authorizedApi.delete('/api/sse/subscriptions', {
      body: JSON.stringify({
        topics: cardForUnSubscription,
      }),
    });
  }
};

ctx.onconnect = (event: MessageEvent) => {
  const port = event.ports[0];
  const currentPortId = portId++;

  ports.set(currentPortId, new PortConnection(port));
  portMetricCodeMap.set(port, new Set());

  if (connectionStatus === CONNECTION_STATUS.CONNECTED) {
    port.postMessage({
      type: DASHBOARD_SSE_EVENT.CONNECT,
    });
  } else {
    createSseClient().catch(onerror);
  }

  port.start();

  port.onmessage = async (
    event: MessageEvent<DashboardSsePortToWorkerMessage>,
  ) => {
    const { type, data } = event.data;

    switch (type) {
      case DASHBOARD_SSE_EVENT.CONNECT:
        accessToken = data.authToken;
        break;
      case DASHBOARD_SSE_EVENT.SUBSCRIBE:
        {
          const { topics } = data;

          await handleSubscribe(topics, port);
        }
        break;
      case DASHBOARD_SSE_EVENT.UNSUBSCRIBE:
        {
          const { topics } = data;
          await handleUnsubscribe(topics, port);
        }
        break;
      case DASHBOARD_SSE_EVENT.CLOSE:
        {
          const topics = [...(portMetricCodeMap.get(port) ?? [])];

          await handleUnsubscribe(topics, port).finally(() => {
            portMetricCodeMap.delete(port);
            ports.delete(currentPortId);

            if (ports.size === 0) {
              metricCodeSubscriptionMap.clear();
            }
            abortSseConnection();
          });
        }
        break;
      case DASHBOARD_SSE_EVENT.PING:
        ports.get(currentPortId)?.updatePingAt();
        break;
    }
  };
};
```

# SharedWorker 관련 트러블 슈팅

토스 컨퍼런스에서 공유한 내용 중 SharedWorker에서 메인스레드와 연결된 Port들로 인한 메모리 누수가 문제가 되었다고 한다. 브라우저가 닫히면 해당 브라우저와 연결된 MessagePort에서 close와 같은 이벤트가 발생할줄 알았지만 브라우저 내부적으로 undefined 처리하여 별도의 `close` 와 같은 이벤트가 발생하지 않는다고 한다.

문제는 SharedWorker에서 워커와 연결된 메인스레드들에게 메세지를 중개(broadcast)하기 위해 각 Port들을 배열과 같은 자료구조에 저장하는데 이때 port 참조가 생겨 가비지컬렉션 대상에서 제외되어 닫힌 탭에 대한 Port가 유지되어 메모리 누수가 발생한다고 한다.

따라서, 토스에서는 WeakRef를 통해 해당 문제를 극복했다고 한다.

`WeakRef` 를 사용하면 다른 객체에 대한 약한 참조를 유지할 수 있으며, 이 때 참조된 객체는 가비지 컬렉션 대상에서 제외되지 않는다고 한다.

따라서 아래의 코드처럼 가비지컬렉팅 여부를 확인할 수 있다.

```tsx
const obj = {};

const weakObj = new WeakRef(obj);

const getRef = () => {
  const ref = weakObj.deref();
  if(ref === undefined) {
    // obj가 가비지 컬렉팅 된 것임
    // 리소스 회수 로직 추가
  }
  return ref;
}
```

## 문제 발생

위와 같은 방식으로 port들을 WeakRef로 감싸서, 약함 참조를 유지하도록 했지만 탭이 닫혀도 여전히 WeakRef로 감쌌던 port가 undefined 처리되지 않아 해당 port를 제거하는 코드가 실행되지 못했다

작성했던 코드

```tsx
/*
 * Port 목록을 순회하며 연결이 유지된 port에 대해 콜백 호출, 연결이 끊어진 port는 제거
 */
const clearDeadPortsAndIterateAlivePorts = (
  fn?: (port: MessagePort) => void,
) => {
  for (let i = ports.length - 1; i >= 0; i--) {
    const portRef = ports[i].deref();
    if (!portRef) {
      ports.splice(i, 1);
      continue;
    }
    fn?.(portRef);
  }
};

ctx.onconnect = (event: MessageEvent) => {
      const port = event.ports[0];
      const weakPort = new WeakRef(port);
      ports.push(weakPort);

      if (!isSseClientCreated) {
        createSseClient().catch(onerror);
      }
      port.start();

      port.onmessage = (event: MessageEvent) => {
        const { type, data } = event.data;
        if (type === DASHBOARD_SSE_EVENT.CONNECT) {
          accessToken = data.authToken;
        }
      };

      port.postMessage({
        type: DASHBOARD_SSE_EVENT.CONNECT,
      });
    };
```

`cleanDeadPortsAndIterateAlivePorts()`를 broadcast 시 매번 호출했지만 동작하지 않았다.

관련해서 자료를 보니 참고할 자료가 많이 없었지만 나와 같은 문제를 겪은 분의 [블로그](https://curt-poem.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%99%80-%EB%A9%80%ED%8B%B0-%EC%93%B0%EB%A0%88%EB%93%9C-2-Shared-Worker%EB%A1%9C-%EC%97%AC%EB%9F%AC-%ED%83%AD%EA%B3%BC-%EC%B0%BD%EC%9D%98-%EB%8D%B0%EC%9D%B4%ED%84%B0%EB%A5%BC-%EA%B3%B5%EC%9C%A0%ED%95%98%EA%B8%B0%EC%B6%94%EC%83%81%ED%99%94%ED%95%98%EC%97%AC-%EB%A9%94%EB%AA%A8%EB%A6%AC-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0?category=1074985)글을 찾게 되었다.

해당 블로그에서는 브라우저 내부적으로 port에 대한 강한 참조를 가지고 있어서 WeakRef를 활용해 약한 참조를 가지게 해도 port에 대한 GC가 발생하지 않는 것 같다고 추측한다고 작성해주셨다.

따라서, 이 부분에 대해 의문을 가지고 더 조사를 해봤다.

조사 결과 [HTML5 표준 스펙](https://html.spec.whatwg.org/multipage/web-messaging.html#ports-and-garbage-collection)에서 관련 정보를 찾을 수 있었다.

<aside>
💡

MessagePort 객체는 다른 쌍의 MessagePort 객체와서로 연결되어 상태 즉, **entangled 상태**이고 `message` or `onmessage` 리스너가 등록된 경우, 브라우저 엔진은 해당 MessagePort 객체를 강한 참조를 가진 객체로 취급해야 한다고 한다.

또한, MessagePort 객체는 태스크나 태스크 큐에 해당 MessagePort에서 발생한 이벤트가 존재하는 경우나 MessagePort의 port message port가 사용 가능하고 비어있지 않는 경우 GC 대상이 아니게 된다.

</aside>

따라서, MessagePort 객체를 명시적으로 close하지 않는 경우에는 브라우저 엔진은 해당 port 객체의 연결이 유지된 경우 GC 대상에서 제외하는 것이다.

위 정보를 통해 기존 WeakRef를 사용하는 설계에서 메인스레드 - SharedWorker와 연결된 Port를 명시적으로 close하지 않으면 WeakRef를 사용하더라도 GC가 되지 않는 것이다!

따라서, 서버에서 클라이언트로 연결 상태를 체크하기 위해 일정 간격으로 신호를 보낸 heartbeat를 메인스레드 - 워커 스레드에 설정하여 워커 스레드에서 더이상 메시지를 보내지 않는 Port를 찾아서 close하는 방식으로 변경했다.

또한, beforeunload 이벤트를 감지하여 창닫기 시 MessagePort를 닫도록 하여 SharedWorker로 SSE 연결을 관리하는 구조를 만들었다.

이후에는 SharedWorker를 지원하지 않는 브라우저의 경우에는 DedicatedWorker가 작동하게끔 Fallback도 두어 안정성을 더욱 높였다.

- 전체 SharedWorker 관련 코드

```tsx
/// <reference lib="webworker" />

import {
  DASHBOARD_SSE_EVENT,
  DASHBOARD_SSE_SHARED_WORKER,
  DASHBOARD_SSE_WORKER,
  type MetricCardCode,
} from '@/constants/dashboard';
import { API_BASE_URL } from '@/constants/shared';
import { postAuthRefresh } from '@/services/auth';
import {
  authorizedApi,
  authToken,
  createApiError,
  createTimeoutError,
  isApiError,
} from '@/services/shared';
import type { DashboardSsePortToWorkerMessage } from '@/types/dashboard';
import type { EventSourceMessage } from '@/types/shared';
import { PortConnection } from '@/utils/dashboard';
import { parseRawEvent, type ValueOf } from '@/utils/shared';

const {
  RETRY_INTERVAL,
  MAXIMUM_RETRY_TIME,
  CONNECTION_STATUS,
  MAXIMUM_RETRY_COUNT,
} = DASHBOARD_SSE_WORKER;

const { CLEANUP_INTERVAL } = DASHBOARD_SSE_SHARED_WORKER;

// 포트 ID
let portId = 0;
// 각 포트 인스턴스 목록 (탭 목록)
const ports: Map<number, PortConnection> = new Map();

// 탭별 구독하는 지표 코드 목록 매핑
const portMetricCodeMap = new Map<MessagePort, Set<MetricCardCode>>();

// 현재 브라우저에서 구독하는 지표 카운트 맵
const metricCodeSubscriptionMap = new Map<MetricCardCode, number>();

const ctx: SharedWorkerGlobalScope = self as unknown as SharedWorkerGlobalScope;

let accessToken: string | null = null;

let retryCount = 0;

let currentRequestAbortController: AbortController = new AbortController();

let connectionStatus: ValueOf<typeof CONNECTION_STATUS> =
  CONNECTION_STATUS.PREPARE;
/**
 * SSE 연결이 끊어질 때 호출되는 콜백 (서버에서 timeout 시 sse 연결 해제)
 */
const onclose = () => {
  throw createTimeoutError('SSE connection timeout');
};

const onerror = (error: unknown) => {
  console.error(error);
};

/**
 * 지수 백오프 알고리즘을 사용하여 재시도 간격을 계산
 */
const retryIntervalFn = () => {
  retryCount++;
  return Math.min(
    RETRY_INTERVAL * Math.pow(2, retryCount - 1),
    MAXIMUM_RETRY_TIME,
  );
};

const unsubscribeMetricCard =
  (cardForUnSubscription: MetricCardCode[]) => (cardCode: MetricCardCode) => {
    const subscriptionCount = metricCodeSubscriptionMap.get(cardCode);
    if (subscriptionCount === 1) {
      cardForUnSubscription.push(cardCode);
      metricCodeSubscriptionMap.delete(cardCode);
    } else if (subscriptionCount) {
      metricCodeSubscriptionMap.set(cardCode, subscriptionCount - 1);
    }
  };

/**
 *
 */
const abortSseConnection = () => {
  if (currentRequestAbortController.signal.aborted || !allPortsDisconnected()) {
    return;
  }
  currentRequestAbortController.abort();
  connectionStatus = CONNECTION_STATUS.DISCONNECTED;
};

let isCleaningUp = false;
/*
 * Port 목록을 순회하며 연결이 유지된 port에 대해 콜백 호출, 연결이 끊어진 port는 제거
 */
const cleanUpDeadPorts = async () => {
  const cardForUnSubscription: MetricCardCode[] = [];
  for (const [portId, portConnection] of ports.entries()) {
    if (portConnection.isStale()) {
      const topics = portMetricCodeMap.get(portConnection.port);

      const unsubscribedCardCodes = unsubscribeMetricCard(
        cardForUnSubscription,
      );
      topics?.forEach(unsubscribedCardCodes);

      portMetricCodeMap.delete(portConnection.port);
      portConnection.port.close();
      ports.delete(portId);
    }
  }

  if (cardForUnSubscription.length > 0) {
    await authorizedApi.delete('/api/sse/subscriptions', {
      body: JSON.stringify({
        topics: cardForUnSubscription,
      }),
    });
  }
  abortSseConnection();
};

/**
 * 연결이 끊어진 port를 주기적으로 정리
 */
setInterval(() => {
  if (isCleaningUp) {
    return;
  }
  isCleaningUp = true;
  cleanUpDeadPorts()
    .catch(onerror)
    .finally(() => {
      isCleaningUp = false;
    });
}, CLEANUP_INTERVAL);

/**
 * 모든 포트에 메세지를 브로드캐스트
 */
const broadcastMessage = (message: EventSourceMessage | null) => {
  if (!message) {
    return;
  }

  ports.forEach(({ port }) => {
    port.postMessage({
      type: DASHBOARD_SSE_EVENT.MESSAGE,
      data: message,
    });
  });

  return;
};

/**
 * shared worker 내에 연결된 모든 port가 연결이 끊어진 상태인지 확인
 */
const allPortsDisconnected = () => {
  return ports.size === 0;
};

const createSseClient = () => {
  return new Promise<void>((resolve, reject) => {
    if (
      connectionStatus === CONNECTION_STATUS.CONNECTED ||
      connectionStatus === CONNECTION_STATUS.CONNECTING
    ) {
      return resolve();
    }

    connectionStatus = CONNECTION_STATUS.CONNECTING;

    const headers = new Headers({
      Authorization: `Bearer ${accessToken ?? authToken.get()}`,
    });

    if (!headers.has('Accept')) {
      headers.set('Accept', 'text/event-stream');
    }

    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const dispose = () => {
      retryCount = 0;
      connectionStatus = CONNECTION_STATUS.PREPARE;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
      if (!currentRequestAbortController.signal.aborted) {
        currentRequestAbortController.abort();
      }
    };

    const create = async () => {
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
      // 이미 SSE 연결이 생성된 경우 return
      if (connectionStatus === CONNECTION_STATUS.CONNECTED) {
        resolve();
        return;
      }

      const currentController = new AbortController();
      currentRequestAbortController = currentController;

      try {
        const response = await fetch(`${API_BASE_URL}/api/sse/connection`, {
          headers,
          signal: currentController.signal,
        });

        // 응답 상태 코드가 200이 아닌 경우 에러 throw
        if (!response.ok) {
          throw await createApiError(response);
        }

        connectionStatus = CONNECTION_STATUS.CONNECTED;

        const reader = response.body?.getReader();

        if (!reader) {
          throw new Error('Reader is not found');
        }

        const decoder = new TextDecoder('utf-8');
        let buffer = '';

        // SSE 연결 유지를 위해 무한 루프 (스트리밍)
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
              const message = parseRawEvent(rawEvent);

              broadcastMessage(message);
            }

            // 연결된 탭이 없는 경우, SSE 연결 해제 후 연결 상태 초기화
            if (allPortsDisconnected()) {
              connectionStatus = CONNECTION_STATUS.DISCONNECTED;
              currentRequestAbortController.abort();
              dispose();
              resolve();
              return;
            }
          }
        }
        reader.releaseLock();
        connectionStatus = CONNECTION_STATUS.DISCONNECTED;

        // 연결된 탭이 있는 경우, 대시보드 SSE는 항상 연결되어야 함 -> 연결 해제 시 에러를 throw하여 연결 재시도
        if (!allPortsDisconnected()) {
          onclose();
        }
        dispose();
        resolve();
      } catch (error) {
        // SSE 연결 해제 후 연결 상태 초기화
        connectionStatus = CONNECTION_STATUS.DISCONNECTED;
        if (!currentController.signal.aborted) {
          // 401 에러 시 토큰 갱신 후 재시도 (retryIntervalFn 유무와 무관)
          if (isApiError(error) && error.status === 401) {
            await postAuthRefresh()
              .then(({ accessToken }) => {
                authToken.set(accessToken);
                headers.set('Authorization', `Bearer ${accessToken}`);
                if (retryTimer) {
                  clearTimeout(retryTimer);
                }
                if (!allPortsDisconnected()) {
                  retryTimer = setTimeout(create, RETRY_INTERVAL);
                } else {
                  dispose();
                  resolve();
                }
              })
              .catch((err) => {
                dispose();
                reject(err);
              });
            return;
          }

          // onerror 호출 후 재시도
          onerror?.(error);
          const interval = retryIntervalFn();
          if (retryTimer) {
            clearTimeout(retryTimer);
          }
          if (!allPortsDisconnected() && retryCount <= MAXIMUM_RETRY_COUNT) {
            retryTimer = setTimeout(create, interval);
          } else {
            dispose();
            resolve();
          }
        } else {
          // retryInterval이 없는 경우: onerror 알림 후 연결 종료
          onerror?.(error);
          dispose();

          // abort된 경우, 정상 종료 처리
          resolve();
          return;
        }
      }
    };

    create();
  });
};

/**
 * 지표 카드 구독 처리
 */
const handleSubscribe = async (topics: MetricCardCode[], port: MessagePort) => {
  const cardForSubscription: MetricCardCode[] = [];

  topics.forEach((topic) => {
    portMetricCodeMap.get(port)?.add(topic);
    const subscriptionCount = metricCodeSubscriptionMap.get(topic);
    if (!subscriptionCount) {
      metricCodeSubscriptionMap.set(topic, 1);
      cardForSubscription.push(topic);
    } else {
      metricCodeSubscriptionMap.set(topic, subscriptionCount + 1);
    }
  });

  if (cardForSubscription.length > 0) {
    await authorizedApi.post('/api/sse/subscriptions', {
      body: JSON.stringify({
        topics: cardForSubscription,
      }),
    });
  }
};

/**
 * 지표 카드 구독 취소 처리
 */
const handleUnsubscribe = async (
  topics: MetricCardCode[],
  port: MessagePort,
) => {
  const cardForUnSubscription: MetricCardCode[] = [];

  const unsubscribedCardCodes = unsubscribeMetricCard(cardForUnSubscription);
  topics?.forEach((metricCode) => {
    portMetricCodeMap.get(port)?.delete(metricCode);
    unsubscribedCardCodes(metricCode);
  });

  if (cardForUnSubscription.length > 0) {
    await authorizedApi.delete('/api/sse/subscriptions', {
      body: JSON.stringify({
        topics: cardForUnSubscription,
      }),
    });
  }
};

ctx.onconnect = (event: MessageEvent) => {
  const port = event.ports[0];
  const currentPortId = portId++;

  ports.set(currentPortId, new PortConnection(port));
  portMetricCodeMap.set(port, new Set());

  if (connectionStatus === CONNECTION_STATUS.CONNECTED) {
    port.postMessage({
      type: DASHBOARD_SSE_EVENT.CONNECT,
    });
  } else {
    createSseClient().catch(onerror);
  }

  port.start();

  port.onmessage = async (
    event: MessageEvent<DashboardSsePortToWorkerMessage>,
  ) => {
    const { type, data } = event.data;

    switch (type) {
      case DASHBOARD_SSE_EVENT.CONNECT:
        accessToken = data.authToken;
        break;
      case DASHBOARD_SSE_EVENT.SUBSCRIBE:
        {
          const { topics } = data;

          await handleSubscribe(topics, port);
        }
        break;
      case DASHBOARD_SSE_EVENT.UNSUBSCRIBE:
        {
          const { topics } = data;
          await handleUnsubscribe(topics, port);
        }
        break;
      case DASHBOARD_SSE_EVENT.CLOSE:
        {
          const topics = [...(portMetricCodeMap.get(port) ?? [])];

          await handleUnsubscribe(topics, port).finally(() => {
            portMetricCodeMap.delete(port);
            ports.delete(currentPortId);

            if (ports.size === 0) {
              metricCodeSubscriptionMap.clear();
            }
            abortSseConnection();
          });
        }
        break;
      case DASHBOARD_SSE_EVENT.PING:
        ports.get(currentPortId)?.updatePingAt();
        break;
    }
  };
};
```
