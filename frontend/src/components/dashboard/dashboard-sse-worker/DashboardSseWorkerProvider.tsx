import {
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import {
  DASHBOARD_SSE_EVENT,
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

  const sseWorkerMessageSubscriber = useRef(
    new Set<(message: MessageEvent<DashboardSseWorkerToPortMessage>) => void>(),
  );

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

  const closeSseWorker = useCallback(() => {
    const sseWorker = sseWorkerRef.current;
    postMessage({
      type: DASHBOARD_SSE_EVENT.CLOSE,
      data: undefined,
    });
    if (sseWorker instanceof Worker) {
      sseWorker.terminate();
    } else if (sseWorker instanceof SharedWorker) {
      sseWorker.port.close();
    }
  }, [postMessage]);

  useEffect(() => {
    window.addEventListener('beforeunload', closeSseWorker);
    try {
      const sharedWorker = new DashboardSseSharedWorker();
      sseWorkerRef.current = sharedWorker;

      sharedWorker.port.onmessage = (
        event: MessageEvent<DashboardSseWorkerToPortMessage>,
      ) => {
        emitMessage(event);
      };
      sharedWorker.port.start();
    } catch {
      const dedicatedWorker = new DashboardSseDedicatedWorker();
      sseWorkerRef.current = dedicatedWorker;

      dedicatedWorker.onmessage = (
        event: MessageEvent<DashboardSseWorkerToPortMessage>,
      ) => {
        emitMessage(event);
      };
      dedicatedWorker.postMessage({
        type: DASHBOARD_SSE_EVENT.CONNECT,
        data: {
          authToken: authToken.get(),
        },
      });
    }

    return () => {
      closeSseWorker();
      window.removeEventListener('beforeunload', closeSseWorker);
    };
  }, [emitMessage, closeSseWorker]);

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
