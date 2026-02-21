import { useSuspenseQuery } from '@tanstack/react-query';

import { PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetAveragePriceResponseDto } from '@/types/sales';
import { getAveragePriceCardCode } from '@/utils/sales/';
import { formatDateISO } from '@/utils/shared';

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

  const { data } = useSuspenseQuery(
    salesOptions.averagePrice<GetAveragePriceResponseDto>({
      analysisCardCode: averagePriceCardCode,
      customPeriod: !periodType,
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  );
  const { averageOrderAmount, differenceAmount } = data;

  return {
    averageOrderAmount,
    differenceAmount,
  };
};
