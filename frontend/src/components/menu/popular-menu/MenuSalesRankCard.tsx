import {
  DefaultCardFetchBoundary,
  DefaultCardWrapper,
} from '@/components/shared';

import { MenuSalesRankTable } from './MenuSalesRankTable';

export const MenuSalesRankCard = () => {
  return (
    <DefaultCardFetchBoundary className="h-68 flex-1">
      <DefaultCardWrapper
        aria-label="메뉴별 매출 랭킹"
        title="메뉴별 매출 랭킹"
        className="flex h-68 min-w-0 flex-1 flex-col"
      >
        <MenuSalesRankTable />
        {/* 더보기 버튼 제거 */}
        {/* <LoadMoreDataButton
          path={`./${ROUTE_PATHS.ANALYSIS.MENU_SALES_RANK}`}
        /> */}
      </DefaultCardWrapper>
    </DefaultCardFetchBoundary>
  );
};
