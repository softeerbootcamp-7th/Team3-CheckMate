import { API_BASE_URL } from '@/constants/shared';
import type { EventSourceMessage } from '@/types/shared';

import { postAuthRefresh } from '../auth';

import { ApiError, createApiError, isApiError } from './apiError';
import { authToken } from './authToken';

const DEFAULT_RETRY_INTERVAL = 1000;
const DEFAULT_SSE_CONTENT_TYPE = 'text/event-stream';

const createNewMessage = (
  eventType?: string,
  data?: string,
  id?: string,
  retry?: number,
): EventSourceMessage => {
  return {
    event: eventType ?? '',
    data: data ?? '',
    id: id ?? '',
    retry: retry ?? undefined,
  };
};

const parseRawEvent = (rawEvent: string, onRetry?: (retry: number) => void) => {
  const lines = rawEvent.split('\n');
  let eventType: string | undefined;
  let data = '';
  let id: string | undefined;
  let retry: number | undefined;

  for (const line of lines) {
    if (line.startsWith('event:')) {
      eventType = line.replace('event:', '').trim();
      continue;
    }

    if (line.startsWith('data:')) {
      data += line.replace('data:', '');
      continue;
    }

    if (line.startsWith('id:')) {
      id = line.replace('id:', '').trim();
      continue;
    }

    if (line.startsWith('retry:')) {
      retry = parseInt(line.replace('retry:', '').trim(), 10);
      if (!isNaN(retry)) {
        onRetry?.(retry);
      }
    }
  }

  if (data !== '') {
    return createNewMessage(eventType, data, id, retry);
  }
  return null;
};

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
  retryInterval?: (err: unknown) => number | null | undefined | void;

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
    retryInterval: retryIntervalFn,
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
          signal: currentRequestAbortController.signal,
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
        if (!currentRequestAbortController.signal.aborted) {
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
