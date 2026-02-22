import { useSuspenseQuery } from '@tanstack/react-query';

import { MENU_SALES_RANK } from '@/constants/menu';
import type { PERIOD_PRESET_KEYS, PeriodType } from '@/constants/shared';
import { menuOptions } from '@/services/menu';
import type { GetMenuSalesRankingResponseDto } from '@/types/menu';
import { getMenuSalesRankCardCode } from '@/utils/menu';
import { formatDateForDto } from '@/utils/shared';

interface UseMenuSalesRankProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.today7_30>;
  startDate?: Date;
  endDate?: Date;
}

export const useMenuSalesRank = ({
  periodType,
  startDate,
  endDate,
}: UseMenuSalesRankProps) => {
  const cardCode = getMenuSalesRankCardCode(periodType);

  const { data } = useSuspenseQuery(
    menuOptions.menuSalesRank<GetMenuSalesRankingResponseDto>({
      analysisCardCode: cardCode,
      customPeriod: !periodType,
      from: formatDateForDto(startDate),
      to: formatDateForDto(endDate),
    }),
  );

  const isEmptyRankItems = (data?.items ?? []).length === 0;

  const slicedRankItems = (data?.items ?? []).slice(
    0,
    MENU_SALES_RANK.MAX_DISPLAYED_RANK_ITEMS,
  );
  const displayedRankItems = [
    ...slicedRankItems,
    ...Array.from({
      length: MENU_SALES_RANK.MAX_DISPLAYED_RANK_ITEMS - slicedRankItems.length,
    }).map(() => MENU_SALES_RANK.EMPTY_RANK_ITEM),
  ];

  return {
    cardCode,
    isEmptyRankItems,
    displayedRankItems,
  };
};
