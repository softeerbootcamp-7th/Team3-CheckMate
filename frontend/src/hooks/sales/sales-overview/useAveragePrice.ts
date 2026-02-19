import { useSuspenseQuery } from '@tanstack/react-query';

import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetAveragePriceResponseDto } from '@/types/sales';
import { getAveragePriceCardCode } from '@/utils/sales/';

interface UseAveragePriceProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>;
  startDate?: Date;
  endDate?: Date;
}

export const useAveragePrice = ({
  periodType,
  startDate,
  endDate,
}: UseAveragePriceProps): Omit<
  GetAveragePriceResponseDto,
  'hasPreviousData'
> => {
  const averagePriceCardCode = getAveragePriceCardCode(periodType);

  const { data } = useSuspenseQuery({
    ...salesOptions.averagePrice<GetAveragePriceResponseDto>({
      analysisCardCode: averagePriceCardCode,
      customPeriod: !periodType,
      from: startDate?.toISOString(),
      to: endDate?.toISOString(),
    }),
  });

  return {
    averageOrderAmount: data.averageOrderAmount,
    differenceAmount: data.differenceAmount,
  };
};
