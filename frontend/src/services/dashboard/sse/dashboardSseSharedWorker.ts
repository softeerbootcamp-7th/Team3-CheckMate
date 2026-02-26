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
