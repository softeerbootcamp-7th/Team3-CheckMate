import { useSuspenseQuery } from '@tanstack/react-query';

import { MENU_COMBINATION_RANK } from '@/constants/menu';
import type { PERIOD_PRESET_KEYS, PeriodType } from '@/constants/shared';
import { menuOptions } from '@/services/menu';
import type { GetPopularMenuCombinationResponseDto } from '@/types/menu';
import { getMenuCombinationRankCardCode } from '@/utils/menu';
import { formatDateForDto } from '@/utils/shared';

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
      from: formatDateForDto(startDate),
      to: formatDateForDto(endDate),
    }),
  );

  const isEmptyRankItems = (data?.items ?? []).length === 0;

  const slicedRankItems = (data?.items ?? []).slice(
    0,
    MENU_COMBINATION_RANK.MAX_DISPLAYED_MENUS,
  );

  const popularMenuCombinations = slicedRankItems.map((item) => {
    const slicedPairedMenus = (item.pairedMenus ?? []).slice(
      0,
      MENU_COMBINATION_RANK.MAX_DISPLAYED_PAIRED_MENUS,
    );
    return {
      baseMenuName: item.baseMenuName,
      pairedMenus: [
        ...slicedPairedMenus,
        ...Array.from({
          length:
            MENU_COMBINATION_RANK.MAX_DISPLAYED_PAIRED_MENUS -
            slicedPairedMenus.length,
        }).map(() => MENU_COMBINATION_RANK.EMPTY_RANK_PAIRED_MENU_ITEM),
      ],
    };
  });

  return {
    popularMenuCombinations,
    isEmptyRankItems,
  };
};
