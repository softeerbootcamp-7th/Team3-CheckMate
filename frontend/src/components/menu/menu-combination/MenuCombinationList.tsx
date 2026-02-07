import type { MenuCombinationRank } from '@/types/menu';

import { MenuCombinationItem } from './MenuCombinationItem';

interface MenuCombinationListProps {
  rank: MenuCombinationRank['rank'];
  menuName: MenuCombinationRank['menuName'];
  combinationRank: MenuCombinationRank['combinationRank'];
}

export const MenuCombinationList = ({
  rank,
  menuName,
  combinationRank,
}: MenuCombinationListProps) => {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-1">
        <span className="body-small-bold text-brand-main">TOP {rank}</span>
        <span className="title-small-semibold text-grey-900">{menuName}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="body-small-semibold text-grey-700">
          함께 가장 많이 선택된 메뉴
        </span>
        <ul className="flex flex-col gap-1">
          {combinationRank.map((combinationItem) => {
            const isHighlight = combinationItem.rank <= 3;
            return (
              <MenuCombinationItem
                key={combinationItem.rank}
                isHighlight={isHighlight}
                {...combinationItem}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};
