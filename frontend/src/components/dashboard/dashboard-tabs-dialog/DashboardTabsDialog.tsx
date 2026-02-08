import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shared/shadcn-ui';
import { MAX_DASHBOARD_TABS } from '@/constants/dashboard';
import { useDashboardTabsContext } from '@/hooks/dashboard';

import { DashboardTabsDialogContent } from './DashboardTabsDialogContent';

export const DashboardTabsDialog = () => {
  const { dialogOpen, closeDialog } = useDashboardTabsContext();

  return (
    <Dialog open={dialogOpen} onOpenChange={(open) => !open && closeDialog()}>
      <DialogContent
        className="bg-grey-0 w-112.5 gap-0 border-none px-600 py-800"
        showCloseButton={false}
      >
        <DialogHeader className="gap-150">
          <DialogTitle className="title-small-bold text-grey-900">
            탭 관리
          </DialogTitle>
          <DialogDescription className="body-medium-medium text-grey-700">
            대시보드 탭은 최대 {MAX_DASHBOARD_TABS}개까지 만들 수 있어요.
          </DialogDescription>
        </DialogHeader>

        <DashboardTabsDialogContent />
      </DialogContent>
    </Dialog>
  );
};

export default DashboardTabsDialog;
