import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_SOURCE } from '@/constants/sales';
import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetSalesSourceByOrderChannelResponseDto } from '@/types/sales';
import { getOrderChannelCardCode } from '@/utils/sales';
import { formatDateForDto } from '@/utils/shared';

interface UseOrderChannelProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>;
  startDate?: Date;
  endDate?: Date;
}

export const useOrderChannel = ({
  periodType,
  startDate,
  endDate,
}: UseOrderChannelProps) => {
  const orderChannelCardCode = getOrderChannelCardCode(periodType);

  const queryOptions =
    salesOptions.orderChannel<GetSalesSourceByOrderChannelResponseDto>({
      analysisCardCode: orderChannelCardCode,
      customPeriod: !periodType,
      from: formatDateForDto(startDate),
      to: formatDateForDto(endDate),
    });

  const { data } = useSuspenseQuery(queryOptions);

  const orderChannelData = useMemo(
    () =>
      Object.entries(SALES_SOURCE.ORDER_CHANNEL).map(([key, label]) => {
        const found = data.items.find((item) => item.orderChannel === key);
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
    orderChannelData,
  };
};
