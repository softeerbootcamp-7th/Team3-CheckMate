import type { DashboardSseEvent, MetricCardCode } from '@/constants/dashboard';

import type { EventSourceMessage } from '../shared';

export type DashboardSseWorkerToPortMessage = MessageEvent<EventSourceMessage>;

export type DashboardSsePortToWorkerMessage =
  | {
      type: Extract<DashboardSseEvent, 'subscribe' | 'unsubscribe'>;
      data: {
        topics: MetricCardCode[];
      };
    }
  | {
      type: Extract<DashboardSseEvent, 'connect'>;
      data: {
        authToken: string;
      };
    }
  | {
      type: Extract<DashboardSseEvent, 'close'>;
      data: undefined;
    };
