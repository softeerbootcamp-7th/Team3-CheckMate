import { useSuspenseQuery } from '@tanstack/react-query';

import { INGREDIENT_CONSUMPTION_RANK, MENU_METRIC } from '@/constants/menu';
import { PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { menuOptions } from '@/services/menu';
import type { GetIngredientUsageRankingResponseDto } from '@/types/menu';
import { formatDateForDto } from '@/utils/shared';

interface UseIngredientConsumptionRankProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.todayOnly>;
  startDate?: Date;
  endDate?: Date;
}
export const useIngredientConsumptionRank = ({
  periodType,
  startDate,
  endDate,
}: UseIngredientConsumptionRankProps) => {
  const cardCode =
    MENU_METRIC.INGREDIENT_CONSUMPTION.INGREDIENT_CONSUMPTION_RANK.cardCodes
      .today;

  const { data } = useSuspenseQuery(
    menuOptions.ingredientConsumptionRank<GetIngredientUsageRankingResponseDto>(
      {
        analysisCardCode: cardCode,
        customPeriod: !periodType,
        from: formatDateForDto(startDate),
        to: formatDateForDto(endDate),
      },
    ),
  );

  const rankItems = data?.items ?? [];

  const isEmptyRankItems = rankItems.length === 0;

  const slicedRankItems = rankItems.slice(
    0,
    INGREDIENT_CONSUMPTION_RANK.MAX_DISPLAYED_RANK_ITEMS_6_TO_10,
  );

  const adjustedRankItems = [
    ...slicedRankItems,
    ...Array.from({
      length:
        INGREDIENT_CONSUMPTION_RANK.MAX_DISPLAYED_RANK_ITEMS_6_TO_10 -
        slicedRankItems.length,
    }).map(() => INGREDIENT_CONSUMPTION_RANK.EMPTY_RANK_ITEM),
  ];

  const rankItems1to5 = adjustedRankItems.slice(
    0,
    INGREDIENT_CONSUMPTION_RANK.MAX_DISPLAYED_RANK_ITEMS_1_TO_5,
  );
  const rankItems6to10 = adjustedRankItems.slice(
    INGREDIENT_CONSUMPTION_RANK.MAX_DISPLAYED_RANK_ITEMS_1_TO_5,
    INGREDIENT_CONSUMPTION_RANK.MAX_DISPLAYED_RANK_ITEMS_6_TO_10,
  );

  return {
    hasIngredient: data?.hasIngredient ?? false,
    isEmptyRankItems,
    rankItems1to5,
    rankItems6to10,
  };
};
