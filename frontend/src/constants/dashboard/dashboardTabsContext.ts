import { createContext } from 'react';

import type { DashboardTabsDialogMode } from './dashboardTabsDialogMode';

interface DashboardTabsContextType {
  currentDashboardId: number;
  dialogOpen: boolean;
  dialogMode: DashboardTabsDialogMode | null;
  setCurrentDashboardId: (id: number) => void;
  openDialog: (mode: DashboardTabsDialogMode) => void;
  closeDialog: () => void;
}

export const DashboardTabsContext = createContext<
  DashboardTabsContextType | undefined
>(undefined);
