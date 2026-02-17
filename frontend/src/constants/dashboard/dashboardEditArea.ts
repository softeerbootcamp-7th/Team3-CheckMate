import type { ValueOf } from '@/utils/shared';

export const DIRECTIONS = {
  DOWN: { dx: 0, dy: 1 },
  RIGHT: { dx: 1, dy: 0 },
  UP: { dx: 0, dy: -1 },
  LEFT: { dx: -1, dy: 0 },
};

export const DASHBOARD_EDIT_AREA = {
  LIST: 'list',
  GRID: 'grid',
} as const;

export type DashboardEditArea = ValueOf<typeof DASHBOARD_EDIT_AREA>;
