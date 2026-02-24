import {
  DefaultCardFetchBoundary,
  DefaultCardWrapper,
} from '@/components/shared';
import { RefreshedTimeButton } from '@/components/shared/refreshed-time-button';
import { useMenuSalesRank } from '@/hooks/menu';

import { MenuSalesRankTable } from './MenuSalesRankTable';
import { usePopularMenuPeriodType } from './period-type-provider';

export const MenuSalesRankCard = () => {
  const { periodType, startDate, endDate } = usePopularMenuPeriodType();

  const { queryKey, displayedRankItems } = useMenuSalesRank({
    periodType,
    startDate,
    endDate,
  });
  return (
    <DefaultCardFetchBoundary className="h-80 flex-1">
      <DefaultCardWrapper
        aria-label="메뉴별 매출 랭킹"
        title="메뉴별 매출 랭킹"
        className="flex h-80 min-w-0 flex-1 flex-col justify-between"
      >
        <MenuSalesRankTable displayedRankItems={displayedRankItems} />
        {/* 더보기 버튼 제거 */}
        {/* <LoadMoreDataButton
          path={`./${ROUTE_PATHS.ANALYSIS.MENU_SALES_RANK}`}
        /> */}
        <RefreshedTimeButton queryKey={queryKey} />
      </DefaultCardWrapper>
    </DefaultCardFetchBoundary>
  );
};
