/// <reference lib="webworker" />

import { DASHBOARD_SSE_EVENT } from '@/constants/dashboard';
import { API_BASE_URL } from '@/constants/shared';
import { postAuthRefresh } from '@/services/auth';
import {
  authToken,
  createApiError,
  createTimeoutError,
  isApiError,
} from '@/services/shared';
import type { EventSourceMessage } from '@/types/shared';
import { parseRawEvent } from '@/utils/shared';

const ctx: DedicatedWorkerGlobalScope =
  self as unknown as DedicatedWorkerGlobalScope;

const RETRY_INTERVAL = 1000;
const MAXIMUM_RETRY_TIME = 30000;

let retryCount = 0;

let isSseClientCreated = false;

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

/**
 * DedicatedWorker에서 메인스레드로 메세지를 전송
 */
const broadcastMessage = (message: EventSourceMessage | null) => {
  if (!message) {
    return;
  }

  ctx.postMessage({
    type: DASHBOARD_SSE_EVENT.MESSAGE,
    data: message,
  });
};

const createSseClient = () => {
  return new Promise<void>((resolve, reject) => {
    const headers = new Headers({
      Authorization: `Bearer ${authToken.get()}`,
    });

    if (!headers.has('Accept')) {
      headers.set('Accept', 'text/event-stream');
    }

    let currentRequestAbortController: AbortController = new AbortController();

    let retryTimer: ReturnType<typeof setTimeout> | null = null;

    const dispose = () => {
      isSseClientCreated = false;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
      if (!currentRequestAbortController.signal.aborted) {
        currentRequestAbortController.abort();
      }
    };

    const create = async () => {
      // 이미 SSE 연결이 생성된 경우 return
      if (isSseClientCreated) {
        resolve();
        return;
      }

      isSseClientCreated = true;
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

              if (message?.event === DASHBOARD_SSE_EVENT.CONNECT) {
                retryCount = 0;
              }
              broadcastMessage(message);
            }
          }
        }
        reader.releaseLock();
        isSseClientCreated = false;

        onclose();
        dispose();
        resolve();
      } catch (error) {
        // SSE 연결 해제 후 연결 상태 초기화
        isSseClientCreated = false;
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
                retryTimer = setTimeout(create, RETRY_INTERVAL);
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
          retryTimer = setTimeout(create, interval);
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

await createSseClient().catch(onerror);

// DedicatedWorker 인 경우
ctx.onmessage = () => {
  if (!isSseClientCreated) {
    createSseClient().catch(onerror);
  }
};
