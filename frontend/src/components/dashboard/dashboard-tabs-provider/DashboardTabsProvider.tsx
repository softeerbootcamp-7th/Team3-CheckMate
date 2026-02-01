import { type PropsWithChildren, useState } from 'react';

import {
  DashboardTabsContext,
  type DashboardTabsDialogMode,
} from '@/constants/dashboard';

export const DashboardTabsProvider = ({ children }: PropsWithChildren) => {
  const [tabs, setTabs] = useState<string[]>(['홈 대시보드', '퇴근']);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<DashboardTabsDialogMode | null>(
    null,
  );

  const openDialog = (mode: DashboardTabsDialogMode) => {
    setDialogMode(mode);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setDialogMode(null);
  };

  return (
    <DashboardTabsContext.Provider
      value={{ tabs, setTabs, openDialog, closeDialog, dialogMode, dialogOpen }}
    >
      {children}
    </DashboardTabsContext.Provider>
  );
};
