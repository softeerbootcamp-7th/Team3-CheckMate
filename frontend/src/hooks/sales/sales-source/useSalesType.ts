import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_SOURCE } from '@/constants/sales';
import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetSalesSourceBySalesTypeResponseDto } from '@/types/sales';
import { getSalesTypeCardCode } from '@/utils/sales';
import { formatDateISO } from '@/utils/shared';

interface UseSalesTypeProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>;
  startDate?: Date;
  endDate?: Date;
}

export const useSalesType = ({
  periodType,
  startDate,
  endDate,
}: UseSalesTypeProps) => {
  const salesTypeCardCode = getSalesTypeCardCode(periodType);

  const { data } = useSuspenseQuery({
    ...salesOptions.salesType<GetSalesSourceBySalesTypeResponseDto>({
      analysisCardCode: salesTypeCardCode,
      customPeriod: !periodType,
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  });

  const salesTypeData = useMemo(
    () =>
      Object.entries(SALES_SOURCE.SALES_TYPE).map(([key, label]) => {
        const found = data.items.find((item) => item.salesType === key);
        return {
          salesSource: label,
          salesAmount: found?.salesAmount ?? 0,
          orderCount: found?.orderCount ?? 0,
          deltaShare: found?.deltaShare ?? 0,
        };
      }),
    [data],
  );

  return {
    salesTypeData,
  };
};
