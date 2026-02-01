import { createContext } from 'react';

import type { ValueOf } from '@/utils/shared';

export const DASHBOARD_TABS_DIALOG_MODE = {
  ADD: 'add',
  MANAGE: 'manage',
};
export type DashboardTabsDialogMode = ValueOf<
  typeof DASHBOARD_TABS_DIALOG_MODE
>;

type DashboardTabsContextType = {
  tabs: string[];
  dialogOpen: boolean;
  dialogMode: DashboardTabsDialogMode | null;
  setTabs: (tabs: string[]) => void;
  openDialog: (mode: DashboardTabsDialogMode) => void;
  closeDialog: () => void;
};

export const DashboardTabsContext = createContext<
  DashboardTabsContextType | undefined
>(undefined);
