import { useSuspenseQuery } from '@tanstack/react-query';

import type { PERIOD_PRESET_KEYS, PeriodType } from '@/constants/shared';
import { menuOptions } from '@/services/menu';
import type { GetPopularMenuCombinationResponseDto } from '@/types/menu';
import { getMenuCombinationRankCardCode } from '@/utils/menu';
import { formatDateISO } from '@/utils/shared';

interface UseMenuCombinationRankProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.recent7_14>;
  startDate?: Date;
  endDate?: Date;
}

export const useMenuCombinationRank = ({
  periodType,
  startDate,
  endDate,
}: UseMenuCombinationRankProps) => {
  const cardCode = getMenuCombinationRankCardCode(periodType);

  const { data } = useSuspenseQuery(
    menuOptions.menuCombinationRank<GetPopularMenuCombinationResponseDto>({
      analysisCardCode: cardCode,
      customPeriod: !periodType,
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  );

  return {
    popularMenuCombinations: data?.items ?? [],
  };
};
