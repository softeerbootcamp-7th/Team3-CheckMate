import { DefaultCardWrapper } from '@/components/shared';
import { useMenuCombinationRank } from '@/hooks/menu';

import { MenuCombinationRankCardContent } from './MenuCombinationRankCardContent';
import { useMenuCombinationPeriodType } from './period-type-provider';

export const MenuCombinationRankCard = () => {
  const { periodType, startDate, endDate } = useMenuCombinationPeriodType();

  const { popularMenuCombinations, isEmptyRankItems } = useMenuCombinationRank({
    periodType,
    startDate,
    endDate,
  });

  return (
    <DefaultCardWrapper
      aria-label="인기 메뉴 조합 랭킹"
      className="flex h-[25rem] w-full flex-row gap-10"
    >
      <MenuCombinationRankCardContent
        popularMenuCombinations={popularMenuCombinations}
        isEmptyRankItems={isEmptyRankItems}
      />
    </DefaultCardWrapper>
  );
};
