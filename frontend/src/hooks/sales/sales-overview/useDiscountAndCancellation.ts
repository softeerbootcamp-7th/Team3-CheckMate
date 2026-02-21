import { useSuspenseQuery } from '@tanstack/react-query';

import { PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetDiscountAndCancellationResponseDto } from '@/types/sales';
import { getDiscountAndCancellationCardCode } from '@/utils/sales/';
import { formatDateISO } from '@/utils/shared';

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

  const { data } = useSuspenseQuery(
    salesOptions.discountAndCancellation<GetDiscountAndCancellationResponseDto>(
      {
        analysisCardCode: discountAndCancellationCardCode,
        customPeriod: !periodType,
        from: startDate ? formatDateISO(startDate) : undefined,
        to: endDate ? formatDateISO(endDate) : undefined,
      },
    ),
  );
  const { discountAmount, canceledAmount, orderCount } = data;
  return {
    discountAmount,
    canceledAmount,
    orderCount,
  };
};
