import { type PropsWithChildren, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import {
  DashboardTabsContext,
  type DashboardTabsDialogMode,
} from '@/constants/dashboard';
import { dashboardOptions } from '@/services/dashboard';

export const DashboardTabsProvider = ({ children }: PropsWithChildren) => {
  const { data: tabs } = useSuspenseQuery(dashboardOptions.list);

  // localStorage에 대시보드 ID 저장
  const STORAGE_KEY = 'dashboard_current_id';
  const getSavedDashboardId = () => {
    if (localStorage.getItem(STORAGE_KEY)) {
      const parsedId = Number(localStorage.getItem(STORAGE_KEY));
      if (tabs.some((t) => t.id === parsedId)) {
        return parsedId;
      }
    }
  };
  const saveDashboardId = (id: number) => {
    try {
      localStorage.setItem(STORAGE_KEY, String(id));
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw new Error('선택한 대시보드 정보를 저장할 수 없어요.');
      }
    }
  };

  const [currentDashboardId, setCurrentDashboardIdState] = useState<number>(
    getSavedDashboardId() ?? tabs.find((tab) => tab.isDefault)?.id ?? 1,
  );
  const setCurrentDashboardId = (id: number) => {
    setCurrentDashboardIdState(id);
    saveDashboardId(id);
  };

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
