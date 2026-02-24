import type { ValueOf } from '@/utils/shared';

export const DASHBOARD_SSE_EVENT = {
  MESSAGE: 'message',
  CONNECT: 'connect',
  CLOSE: 'close',
  ERROR: 'error',
  SUBSCRIBE: 'subscribe',
  UNSUBSCRIBE: 'unsubscribe',
  PING: 'ping',
} as const;

export type DashboardSseEvent = ValueOf<typeof DASHBOARD_SSE_EVENT>;
