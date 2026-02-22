import { useSuspenseQuery } from '@tanstack/react-query';

import { PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetOrderCountResponseDto } from '@/types/sales';
import { getOrderCountCardCode } from '@/utils/sales/';
import { formatDateForDto } from '@/utils/shared';

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

  const { data } = useSuspenseQuery(
    salesOptions.orderCount<GetOrderCountResponseDto>({
      analysisCardCode: orderCountCardCode,
      customPeriod: !periodType,
      from: formatDateForDto(startDate),
      to: formatDateForDto(endDate),
    }),
  );

  const { orderCount, differenceOrderCount } = data;
  return {
    orderCount,
    differenceOrderCount,
  };
};
