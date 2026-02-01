import PlusIcon from '@/assets/icons/plus.svg?react';
import { Button } from '@/components/shared/shadcn-ui';
import { DASHBOARD_TABS_DIALOG_MODE } from '@/constants/dashboard';
import { useDashboardTabsContext } from '@/hooks/dashboard';

export const AddTabDialogTrigger = () => {
  const { openDialog } = useDashboardTabsContext();

  return (
    <Button
      aria-label="새 대시보드 추가"
      className="w-fit p-2.5!"
      onClick={() => openDialog(DASHBOARD_TABS_DIALOG_MODE.ADD)}
    >
      <PlusIcon className="size-5" aria-hidden="true" />
    </Button>
  );
};
