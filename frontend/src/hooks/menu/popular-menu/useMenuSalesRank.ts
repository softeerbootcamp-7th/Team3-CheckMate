import { useSuspenseQuery } from '@tanstack/react-query';

import { MENU_SALES_RANK } from '@/constants/menu';
import type { PERIOD_PRESET_KEYS, PeriodType } from '@/constants/shared';
import { menuOptions } from '@/services/menu';
import type { GetMenuSalesRankingResponseDto } from '@/types/menu';
import { getMenuSalesRankCardCode } from '@/utils/menu';
import { formatDateISO } from '@/utils/shared';

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
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  );

  // data가 undefined일 경우 빈 배열을 반환하도록 방어
  const displayedRankItems = (data?.items ?? []).slice(
    0,
    MENU_SALES_RANK.MAX_DISPLAYED_RANK_ITEMS,
  );

  return {
    cardCode,
    displayedRankItems,
  };
};
