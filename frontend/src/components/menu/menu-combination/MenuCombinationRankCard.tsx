import { DefaultCardWrapper } from '@/components/shared';
import { menuCombinationRankItems } from '@/mocks/data/menu';

import { MenuCombinationList } from './MenuCombinationList';

export const MenuCombinationRankCard = () => {
  return (
    <DefaultCardWrapper
      aria-label="인기 메뉴 조합 랭킹"
      className="flex w-full flex-row gap-10"
    >
      {menuCombinationRankItems.map((item) => (
        <MenuCombinationList key={item.rank} {...item} />
      ))}
    </DefaultCardWrapper>
  );
};
