import { useCallback, useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { PlusIcon } from '@/assets/icons';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shared/shadcn-ui';
import { DASHBOARD_TABS_DIALOG_MODE } from '@/constants/dashboard';
import { LOCAL_STORAGE_KEY } from '@/constants/shared/localStorageKey';
import { useDashboardTabsContext } from '@/hooks/dashboard';
import { dashboardOptions } from '@/services/dashboard/options';

const { TOOLTIP_DISMISSED: storageKey } = LOCAL_STORAGE_KEY;
const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

const firstActiveDatetime = new Date(); // mocked

export const AddTabDialogTrigger = () => {
  const { data: tabs } = useSuspenseQuery(dashboardOptions.list);

  const { openDialog } = useDashboardTabsContext();

  // 탭이 추가되지 않음 && 첫 진입 후 12시간 이내 && 버튼을 클릭한 적 없음
  const [showTooltip, setShowTooltip] = useState(
    tabs.length === 1 &&
      new Date().getTime() - firstActiveDatetime.getTime() <= TWELVE_HOURS_MS &&
      !localStorage.getItem(storageKey),
  );

  const dismissPermanently = useCallback(() => {
    localStorage.setItem(storageKey, '1');
    setShowTooltip(false);
  }, []);

  const handleAdd = useCallback(() => {
    openDialog(DASHBOARD_TABS_DIALOG_MODE.ADD);
    if (showTooltip) {
      dismissPermanently();
    }
  }, [dismissPermanently, openDialog, showTooltip]);

  return (
    <Tooltip open={showTooltip}>
      <TooltipTrigger asChild>
        <Button
          aria-label="새 대시보드 추가"
          className="w-fit p-2.5!"
          onClick={handleAdd}
        >
          <PlusIcon className="size-5" aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        className="body-small-medium text-grey-100 rounded-250 bg-grey-900 [&_svg]:fill-grey-900 translate-x-20 px-350 py-300 [&_svg]:translate-x-20 [&_svg]:-translate-y-0.5 [&_svg]:rotate-0"
      >
        원하는 대시보드를 직접 만들 수 있어요.
      </TooltipContent>
    </Tooltip>
  );
};
