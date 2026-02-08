import { createContext } from 'react';

import type { DashboardTabsDialogMode } from './dashboardTabsDialogMode';

interface DashboardTabsContextType {
  tabs: string[];
  dialogOpen: boolean;
  dialogMode: DashboardTabsDialogMode | null;
  setTabs: (tabs: string[]) => void;
  openDialog: (mode: DashboardTabsDialogMode) => void;
  closeDialog: () => void;
}

export const DashboardTabsContext = createContext<
  DashboardTabsContextType | undefined
>(undefined);
