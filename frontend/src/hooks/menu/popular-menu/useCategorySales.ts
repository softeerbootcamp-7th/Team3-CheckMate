import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import type { PERIOD_PRESET_KEYS, PeriodType } from '@/constants/shared';
import { menuOptions } from '@/services/menu';
import type { GetCategorySalesResponseDto } from '@/types/menu';
import type { DoughnutChartItem } from '@/types/shared';
import { getCategorySalesCardCode } from '@/utils/menu';
import { formatDateForDto } from '@/utils/shared';

interface UseCategorySalesProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.today7_30>;
  startDate?: Date;
  endDate?: Date;
}

export const useCategorySales = ({
  periodType,
  startDate,
  endDate,
}: UseCategorySalesProps) => {
  const cardCode = getCategorySalesCardCode(periodType);

  const { data } = useSuspenseQuery(
    menuOptions.categorySales<GetCategorySalesResponseDto>({
      analysisCardCode: cardCode,
      customPeriod: !periodType,
      from: formatDateForDto(startDate),
      to: formatDateForDto(endDate),
    }),
  );

  const isEmptyCategorySales = data.items.length === 0;

  const categorySalesChartData: DoughnutChartItem[] = useMemo(
    () =>
      data.items.map((item) => ({
        label: item.category,
        value: item.totalSalesAmount,
      })),
    [data.items],
  );

  return {
    cardCode,
    categorySalesChartData,
    isEmptyCategorySales,
  };
};
