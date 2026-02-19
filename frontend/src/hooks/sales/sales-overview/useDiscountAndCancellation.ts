import { useSuspenseQuery } from '@tanstack/react-query';

import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetDiscountAndCancellationResponseDto } from '@/types/sales';
import { getDiscountAndCancellationCardCode } from '@/utils/sales/';

interface UseDiscountAndCancellationProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>;
  startDate?: Date;
  endDate?: Date;
}

export const useDiscountAndCancellation = ({
  periodType,
  startDate,
  endDate,
}: UseDiscountAndCancellationProps) => {
  const discountAndCancellationCardCode =
    getDiscountAndCancellationCardCode(periodType);

  const { data } = useSuspenseQuery({
    ...salesOptions.discountAndCancellation<GetDiscountAndCancellationResponseDto>(
      {
        analysisCardCode: discountAndCancellationCardCode,
        customPeriod: !periodType,
        from: startDate?.toISOString(),
        to: endDate?.toISOString(),
      },
    ),
  });

  return {
    discountAmount: data.discountAmount,
    canceledAmount: data.canceledAmount,
    orderCount: data.orderCount,
  };
};
