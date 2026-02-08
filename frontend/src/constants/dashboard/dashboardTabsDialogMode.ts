import type { ValueOf } from '@/utils/shared';

export const DASHBOARD_TABS_DIALOG_MODE = {
  ADD: 'add',
  MANAGE: 'manage',
};
export type DashboardTabsDialogMode = ValueOf<
  typeof DASHBOARD_TABS_DIALOG_MODE
>;
