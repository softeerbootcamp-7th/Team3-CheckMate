import { type PropsWithChildren, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import {
  DashboardTabsContext,
  type DashboardTabsDialogMode,
} from '@/constants/dashboard';
import { dashboardOptions } from '@/services/dashboard';

export const DashboardTabsProvider = ({ children }: PropsWithChildren) => {
  const { data: tabs } = useSuspenseQuery(dashboardOptions.list);

  const [currentDashboardId, setCurrentDashboardId] = useState<number>(
    () => tabs.find((tab) => tab.isDefault)?.id ?? 1,
  );
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
