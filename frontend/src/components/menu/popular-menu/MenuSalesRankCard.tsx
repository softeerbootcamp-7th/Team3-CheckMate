import { useMenuSalesRank } from '@/hooks/menu';

import { MenuAnalysisCard } from '../shared';

import { MenuSalesRankItem } from './MenuSalesRankItem';
import { MenuSalesRankLoadMoreButton } from './MenuSalesRankLoadMoreButton';

export const MenuSalesRankCard = () => {
  const { displayedRankItems, hasMoreItems, handleClickMoreButton } =
    useMenuSalesRank();
  return (
    <MenuAnalysisCard
      aria-label="메뉴별 매출 랭킹"
      title="메뉴별 매출 랭킹"
      className="flex h-80 min-w-0 flex-1 flex-col gap-7.5"
    >
      <div className="flex min-h-0 flex-col gap-5">
        <ul className="flex min-h-0 grow flex-col gap-3 overflow-y-auto">
          {displayedRankItems.map(
            ({ rank, menuName, totalSalesAmount, totalOrderCount }) => (
              <MenuSalesRankItem
                key={rank}
                rank={rank}
                menuName={menuName}
                totalSalesAmount={totalSalesAmount}
                totalOrderCount={totalOrderCount}
              />
            ),
          )}
        </ul>
        <MenuSalesRankLoadMoreButton
          onClick={handleClickMoreButton}
          disabled={!hasMoreItems}
        />
      </div>
    </MenuAnalysisCard>
  );
};
