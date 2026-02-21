import { useSuspenseQuery } from '@tanstack/react-query';

import { PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetTotalSalesResponseDto } from '@/types/sales';
import { getTotalSalesCardCode } from '@/utils/sales/';
import { formatDateISO } from '@/utils/shared';

interface UseTotalSalesProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>;
  startDate?: Date;
  endDate?: Date;
}

export const useTotalSales = ({
  periodType,
  startDate,
  endDate,
}: UseTotalSalesProps) => {
  const totalSalesCardCode = getTotalSalesCardCode(periodType);

  const { data } = useSuspenseQuery(
    salesOptions.totalSales<GetTotalSalesResponseDto>({
      analysisCardCode: totalSalesCardCode,
      customPeriod: !periodType,
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  );
  const { grossAmount, orderCount } = data;
  return {
    grossAmount,
    orderCount,
  };
};
