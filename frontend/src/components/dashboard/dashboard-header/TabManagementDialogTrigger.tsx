import { SettingsIcon } from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';
import { DASHBOARD_TABS_DIALOG_MODE } from '@/constants/dashboard';
import { useDashboardTabsContext } from '@/hooks/dashboard';

export const TabManagementDialogTrigger = () => {
  const { openDialog } = useDashboardTabsContext();

  return (
    <Button
      variant="outline"
      className="bg-grey-0 text-grey-700 body-medium-medium! h-fit w-fit gap-200 border-none p-300 pl-250 shadow-none"
      onClick={() => openDialog(DASHBOARD_TABS_DIALOG_MODE.MANAGE)}
    >
      <SettingsIcon className="size-5 p-0" />탭 관리
    </Button>
  );
};
