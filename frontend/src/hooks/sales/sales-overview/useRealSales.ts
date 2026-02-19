import { useSuspenseQuery } from '@tanstack/react-query';

import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetRealSalesResponseDto } from '@/types/sales';
import { getRealSalesCardCode } from '@/utils/sales';

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

  const { data } = useSuspenseQuery({
    ...salesOptions.realSales<GetRealSalesResponseDto>({
      analysisCardCode: realSalesCardCode,
      customPeriod: !periodType,
      from: startDate?.toISOString(),
      to: endDate?.toISOString(),
    }),
  });

  return {
    netAmount: data.netAmount,
    differenceAmount: data.differenceAmount,
  };
};
