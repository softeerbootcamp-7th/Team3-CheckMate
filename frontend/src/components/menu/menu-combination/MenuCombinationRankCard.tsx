import { DefaultCardWrapper, RefreshedTimeButton } from '@/components/shared';
import { useMenuCombinationRank } from '@/hooks/menu';

import { MenuCombinationRankCardContent } from './MenuCombinationRankCardContent';
import { useMenuCombinationPeriodType } from './period-type-provider';

export const MenuCombinationRankCard = () => {
  const { periodType, startDate, endDate } = useMenuCombinationPeriodType();

  const { queryKey, popularMenuCombinations, isEmptyRankItems } =
    useMenuCombinationRank({
      periodType,
      startDate,
      endDate,
    });

  return (
    <DefaultCardWrapper
      aria-label="인기 메뉴 조합 랭킹"
      className="h-108 w-full justify-between"
    >
      <div className="flex flex-row gap-10">
        <MenuCombinationRankCardContent
          popularMenuCombinations={popularMenuCombinations}
          isEmptyRankItems={isEmptyRankItems}
        />
      </div>
      <RefreshedTimeButton queryKey={queryKey} />
    </DefaultCardWrapper>
  );
};
