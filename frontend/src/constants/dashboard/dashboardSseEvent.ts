import type { ValueOf } from '@/utils/shared';

export const DASHBOARD_SSE_EVENT = {
  MESSAGE: 'message',
  CONNECT: 'connect',
  CLOSE: 'close',
  ERROR: 'error',
} as const;

export type DashboardSseEvent = ValueOf<typeof DASHBOARD_SSE_EVENT>;
