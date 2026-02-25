import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_SOURCE } from '@/constants/sales';
import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetSalesSourceByPayMethodResponseDto } from '@/types/sales';
import { getPayMethodCardCode } from '@/utils/sales';
import { formatDateForDto } from '@/utils/shared';

interface UsePayMethodProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>;
  startDate?: Date;
  endDate?: Date;
}

export const usePayMethod = ({
  periodType,
  startDate,
  endDate,
}: UsePayMethodProps) => {
  const payMethodCardCode = getPayMethodCardCode(periodType);
  const queryOptions =
    salesOptions.payMethod<GetSalesSourceByPayMethodResponseDto>({
      analysisCardCode: payMethodCardCode,
      customPeriod: !periodType,
      from: formatDateForDto(startDate),
      to: formatDateForDto(endDate),
    });

  const { data } = useSuspenseQuery(queryOptions);

  const payMethodData = useMemo(
    () =>
      Object.entries(SALES_SOURCE.PAY_METHOD).map(([key, label]) => {
        const found = data.items.find((item) => item.payMethod === key);
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
    queryKey: queryOptions.queryKey,
    payMethodData,
  };
};
