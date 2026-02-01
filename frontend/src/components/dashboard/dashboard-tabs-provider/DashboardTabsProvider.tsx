import { type PropsWithChildren, useState } from 'react';

import {
  DashboardTabsContext,
  type DashboardTabsDialogMode,
} from '@/constants/dashboard';

export const DashboardTabsProvider = ({ children }: PropsWithChildren) => {
  const [tabs, setTabs] = useState<string[]>(['홈 대시보드', '퇴근']);
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
        tabs,
        dialogOpen: dialogState.open,
        dialogMode: dialogState.mode,
        setTabs,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DashboardTabsContext.Provider>
  );
};
