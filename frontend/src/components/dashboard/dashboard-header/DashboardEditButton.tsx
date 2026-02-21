import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { useSuspenseQuery } from '@tanstack/react-query';

import CardsIcon from '@/assets/icons/cards.svg?react';
import { ROUTE_PATHS } from '@/constants/shared';
import { useDashboardTabsContext } from '@/hooks/dashboard';
import { dashboardOptions } from '@/services/dashboard/options';
import { cn } from '@/utils/shared';

export const DashboardEditButton = () => {
  const { data: tabs } = useSuspenseQuery(dashboardOptions.list);

  const { currentDashboardId } = useDashboardTabsContext();

  const disabled = useMemo(() => {
    return tabs.find((tab) => tab.isDefault)?.id === currentDashboardId;
  }, [tabs, currentDashboardId]);

  return (
    <Link
      to={{
        pathname: ROUTE_PATHS.DASHBOARD.EDIT,
        search: `?tab=${tabs.find((tab) => tab.id === currentDashboardId)?.name}`,
      }}
      aria-label="현재 탭의 지표카드 편집"
      className={cn(
        'bg-grey-0 text-grey-700 body-medium-medium rounded-200 flex w-fit gap-200 border-none p-300 pl-250 shadow-none',
        disabled && 'cursor-default opacity-50',
      )}
      onClick={(e) => disabled && e.preventDefault()}
    >
      <CardsIcon className="size-5" />
      카드 편집
    </Link>
  );
};
