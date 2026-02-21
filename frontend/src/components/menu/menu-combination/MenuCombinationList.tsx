import { MENU_COMBINATION_RANK } from '@/constants/menu';
import type { PopularMenuCombination } from '@/types/menu';

import { MenuCombinationItem } from './MenuCombinationItem';

interface MenuCombinationListProps {
  rank: number;
  menuName: PopularMenuCombination['baseMenuName'];
  pairedMenus: PopularMenuCombination['pairedMenus'];
}

export const MenuCombinationList = ({
  rank,
  menuName,
  pairedMenus,
}: MenuCombinationListProps) => {
  if (menuName === null || pairedMenus === null) {
    return null;
  }

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
        <ol className="flex flex-col gap-1">
          {pairedMenus.map((pairedMenu, index) => {
            const isHighlight =
              index + 1 <= MENU_COMBINATION_RANK.HIGHLIGHT_RANK_THRESHOLD;
            return (
              <MenuCombinationItem
                key={index}
                rank={index + 1}
                menuName={pairedMenu.menuName}
                count={pairedMenu.count}
                isHighlight={isHighlight}
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};
