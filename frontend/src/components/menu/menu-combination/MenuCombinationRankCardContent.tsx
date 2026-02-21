import type { GetPopularMenuCombinationResponseDto } from '@/types/menu';

import { MenuCombinationList } from './MenuCombinationList';
import { MenuCombinationRankEmptyView } from './MenuCombinationRankEmptyView';

interface MenuCombinationRankCardContentProps {
  popularMenuCombinations: GetPopularMenuCombinationResponseDto['items'];
  isEmptyRankItems: boolean;
}

export const MenuCombinationRankCardContent = ({
  popularMenuCombinations,
  isEmptyRankItems,
}: MenuCombinationRankCardContentProps) => {
  if (isEmptyRankItems) {
    return <MenuCombinationRankEmptyView />;
  }

  return (
    <>
      {popularMenuCombinations.map(({ baseMenuName, pairedMenus }, index) => (
        <MenuCombinationList
          key={index}
          rank={index + 1}
          menuName={baseMenuName}
          pairedMenus={pairedMenus}
        />
      ))}
    </>
  );
};
