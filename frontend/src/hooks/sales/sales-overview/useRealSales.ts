import { useSuspenseQuery } from '@tanstack/react-query';

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
> => {
  const realSalesCardCode = getRealSalesCardCode(periodType);

  const { data } = useSuspenseQuery(
    salesOptions.realSales<GetRealSalesResponseDto>({
      analysisCardCode: realSalesCardCode,
      customPeriod: !periodType,
      from: formatDateForDto(startDate),
      to: formatDateForDto(endDate),
    }),
  );
  const { netAmount, differenceAmount } = data;

  return {
    netAmount,
    differenceAmount,
  };
};
