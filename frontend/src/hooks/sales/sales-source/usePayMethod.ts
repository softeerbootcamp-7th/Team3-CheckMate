import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_SOURCE } from '@/constants/sales';
import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetSalesSourceByPayMethodResponseDto } from '@/types/sales';
import { getPayMethodCardCode } from '@/utils/sales';
import { formatDateISO } from '@/utils/shared';

interface UsePayMethodProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>;
  startDate?: Date;
  endDate?: Date;
}

export const usePayMethod = ({
  periodType,
  startDate,
  endDate,
}: UsePayMethodProps) => {
  const payMethodCardCode = getPayMethodCardCode(periodType);

  const { data } = useSuspenseQuery({
    ...salesOptions.payMethod<GetSalesSourceByPayMethodResponseDto>({
      analysisCardCode: payMethodCardCode,
      customPeriod: !periodType,
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  });

  const payMethodData = Object.entries(SALES_SOURCE.PAY_METHOD).map(
    ([key, label]) => {
      const found = data.items.find((item) => item.payMethod === key);
      return {
        salesSource: label,
        salesAmount: found ? found.salesAmount : 0,
        orderCount: found ? found.orderCount : 0,
        deltaShare: found ? found.deltaShare : 0,
      };
    },
  );
  return {
    payMethodData,
  };
};
