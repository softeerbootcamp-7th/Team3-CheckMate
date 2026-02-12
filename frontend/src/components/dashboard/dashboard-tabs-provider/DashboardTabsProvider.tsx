import { type PropsWithChildren, useState } from 'react';

import {
  DashboardTabsContext,
  type DashboardTabsDialogMode,
} from '@/constants/dashboard';

export const DashboardTabsProvider = ({ children }: PropsWithChildren) => {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [tabs, setTabs] = useState<string[]>(['홈 대시보드']);
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    mode: DashboardTabsDialogMode | null;
  }>({
    open: false,
    mode: null,
  });

  const openDialog = (mode: DashboardTabsDialogMode) => {
    setDialogState({ open: true, mode });
  };

  const closeDialog = () => {
    setDialogState({ open: false, mode: null });
  };

  return (
    <DashboardTabsContext.Provider
      value={{
        currentTabIndex,
        tabs,
        dialogOpen: dialogState.open,
        dialogMode: dialogState.mode,
        setCurrentTabIndex,
        setTabs,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DashboardTabsContext.Provider>
  );
};
