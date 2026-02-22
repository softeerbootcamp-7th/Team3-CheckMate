import { DefaultCardWrapper } from '@/components/shared';
import { useIngredientConsumptionRank } from '@/hooks/menu';

import { EmptyIngredientView } from './EmptyIngredientView';
import { IngredientConsumptionRankCardContent } from './IngredientConsumptionRankCardContent';
import { useIngredientConsumptionPeriodType } from './period-type-provider';

export const IngredientConsumptionRankCard = () => {
  const { periodType, startDate, endDate } =
    useIngredientConsumptionPeriodType();

  const { hasIngredient, rankItems1to5, rankItems6to10 } =
    useIngredientConsumptionRank({
      periodType,
      startDate,
      endDate,
    });

  if (!hasIngredient) {
    return <EmptyIngredientView className="w-full" />;
  }

  return (
    <DefaultCardWrapper
      aria-label="식재료 소진량 랭킹"
      className="flex h-86 w-full min-w-0 flex-col gap-7.5"
    >
      <IngredientConsumptionRankCardContent
        rankItems1to5={rankItems1to5}
        rankItems6to10={rankItems6to10}
      />
      {/* 더보기 버튼 제거 */}
      {/* <LoadMoreDataButton
        path={`./${ROUTE_PATHS.ANALYSIS.INGREDIENT_CONSUMPTION_RANK}`}
      /> */}
    </DefaultCardWrapper>
  );
};
