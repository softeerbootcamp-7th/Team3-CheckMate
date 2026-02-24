import { createContext } from 'react';

import type {
  DashboardSsePortToWorkerMessage,
  DashboardSseWorkerToPortMessage,
} from '@/types/dashboard';

interface DashboardSseWorkerContextType {
  subscribeMessage: (
    listener: (message: MessageEvent<DashboardSseWorkerToPortMessage>) => void,
  ) => () => void;
  postMessage: (message: DashboardSsePortToWorkerMessage) => void;
}

export const DashboardSseWorkerContext = createContext<
  DashboardSseWorkerContextType | undefined
>(undefined);
