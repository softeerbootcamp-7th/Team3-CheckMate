import type { DashboardSseEvent } from '@/constants/dashboard';

import type { EventSourceMessage } from '../shared';

export interface DashboardSseWorkerMessage {
  type: DashboardSseEvent;
  data: EventSourceMessage;
}
