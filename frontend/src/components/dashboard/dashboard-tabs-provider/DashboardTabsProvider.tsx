import { type PropsWithChildren, useState } from 'react';

import {
  DashboardTabsContext,
  type DashboardTabsDialogMode,
} from '@/constants/dashboard';

const DEFAULT_DASHBOARD_ID = 1; // 홈 대시보드 고정 ID

export const DashboardTabsProvider = ({ children }: PropsWithChildren) => {
  const [currentDashboardId, setCurrentDashboardId] =
    useState<number>(DEFAULT_DASHBOARD_ID);

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
        currentDashboardId,
        dialogOpen: dialogState.open,
        dialogMode: dialogState.mode,
        setCurrentDashboardId,
        openDialog,
        closeDialog,
      }}
    >
      {children}
    </DashboardTabsContext.Provider>
  );
};
