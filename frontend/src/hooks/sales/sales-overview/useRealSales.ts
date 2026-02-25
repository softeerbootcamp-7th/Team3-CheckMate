import { type QueryKey, useSuspenseQuery } from '@tanstack/react-query';

import { PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetRealSalesResponseDto } from '@/types/sales';
import { getRealSalesCardCode } from '@/utils/sales';
import { formatDateForDto } from '@/utils/shared';

interface UseRealSalesProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>;
  startDate?: Date;
  endDate?: Date;
}

export const useRealSales = ({
  periodType,
  startDate,
  endDate,
}: UseRealSalesProps): Omit<
  GetRealSalesResponseDto,
  'hasPreviousData' | 'changeRate'
> & { queryKey: QueryKey } => {
  const realSalesCardCode = getRealSalesCardCode(periodType);

  const queryOptions = salesOptions.realSales<GetRealSalesResponseDto>({
    analysisCardCode: realSalesCardCode,
    customPeriod: !periodType,
    from: formatDateForDto(startDate),
    to: formatDateForDto(endDate),
  });

  const { data } = useSuspenseQuery(queryOptions);
  const { netAmount, differenceAmount } = data;

  return {
    queryKey: queryOptions.queryKey,
    netAmount,
    differenceAmount,
  };
};
