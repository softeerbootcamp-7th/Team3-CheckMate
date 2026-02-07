import { menuCombinationRankItems } from '@/mocks/data/menu';

import { MenuAnalysisCard } from '../shared';

import { MenuCombinationList } from './MenuCombinationList';

export const MenuCombinationRankCard = () => {
  return (
    <MenuAnalysisCard aria-label="인기 메뉴 조합 랭킹" className="flex gap-10">
      {menuCombinationRankItems.map((item) => (
        <MenuCombinationList key={item.rank} {...item} />
      ))}
    </MenuAnalysisCard>
  );
};
