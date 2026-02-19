import { useSuspenseQuery } from '@tanstack/react-query';

import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetOrderCountResponseDto } from '@/types/sales';
import { getOrderCountCardCode } from '@/utils/sales/';

interface UseOrderCountProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>;
  startDate?: Date;
  endDate?: Date;
}

export const useOrderCount = ({
  periodType,
  startDate,
  endDate,
}: UseOrderCountProps): Omit<
  GetOrderCountResponseDto,
  'hasPreviousData' | 'changeRate'
> => {
  const orderCountCardCode = getOrderCountCardCode(periodType);

  const { data } = useSuspenseQuery({
    ...salesOptions.orderCount<GetOrderCountResponseDto>({
      analysisCardCode: orderCountCardCode,
      customPeriod: !periodType,
      from: startDate?.toISOString(),
      to: endDate?.toISOString(),
    }),
  });

  return {
    orderCount: data.orderCount,
    differenceOrderCount: data.differenceOrderCount,
  };
};
