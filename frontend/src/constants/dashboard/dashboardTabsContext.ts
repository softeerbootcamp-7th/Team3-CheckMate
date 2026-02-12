import { createContext } from 'react';

import type { DashboardTabsDialogMode } from './dashboardTabsDialogMode';

interface DashboardTabsContextType {
  currentTabIndex: number;
  tabs: string[];
  dialogOpen: boolean;
  dialogMode: DashboardTabsDialogMode | null;
  setCurrentTabIndex: (index: number) => void;
  setTabs: (tabs: string[]) => void;
  openDialog: (mode: DashboardTabsDialogMode) => void;
  closeDialog: () => void;
}

export const DashboardTabsContext = createContext<
  DashboardTabsContextType | undefined
>(undefined);
