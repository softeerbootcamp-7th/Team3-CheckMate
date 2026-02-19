import { type PropsWithChildren, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import {
  DashboardTabsContext,
  type DashboardTabsDialogMode,
} from '@/constants/dashboard';
import { dashboardOptions } from '@/services/dashboard';

export const DashboardTabsProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient();

  const [currentDashboardId, setCurrentDashboardId] = useState<number>(() => {
    const tabs = queryClient.getQueryData(dashboardOptions.list.queryKey) ?? [];
    return tabs.find((tab) => tab.isDefault)?.id ?? 1;
  });
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
