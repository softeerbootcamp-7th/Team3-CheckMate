import { ROUTE_PATHS } from '@/constants/shared';

import { LoadMoreDataButton, MenuAnalysisCard } from '../shared';

import { MenuSalesRankTable } from './MenuSalesRankTable';

export const MenuSalesRankCard = () => {
  return (
    <MenuAnalysisCard
      aria-label="메뉴별 매출 랭킹"
      title="메뉴별 매출 랭킹"
      className="flex h-80 min-w-0 flex-1 flex-col"
    >
      <div className="flex min-h-0 flex-col gap-5">
        <MenuSalesRankTable />
        <LoadMoreDataButton
          path={`./${ROUTE_PATHS.ANALYSIS.MENU_SALES_RANK}`}
        />
      </div>
    </MenuAnalysisCard>
  );
};
