import { useSuspenseQuery } from '@tanstack/react-query';

import { SALES_SOURCE } from '@/constants/sales';
import { type PERIOD_PRESET_KEYS, type PeriodType } from '@/constants/shared';
import { salesOptions } from '@/services/sales';
import type { GetSalesSourceByOrderChannelResponseDto } from '@/types/sales';
import { getOrderChannelCardCode } from '@/utils/sales';
import { formatDateISO } from '@/utils/shared';

interface UseOrderChannelProps {
  periodType?: PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth>;
  startDate?: Date;
  endDate?: Date;
}

export const useOrderChannel = ({
  periodType,
  startDate,
  endDate,
}: UseOrderChannelProps) => {
  const orderChannelCardCode = getOrderChannelCardCode(periodType);

  const { data } = useSuspenseQuery({
    ...salesOptions.orderChannel<GetSalesSourceByOrderChannelResponseDto>({
      analysisCardCode: orderChannelCardCode,
      customPeriod: !periodType,
      from: startDate ? formatDateISO(startDate) : undefined,
      to: endDate ? formatDateISO(endDate) : undefined,
    }),
  });

  const orderChannelData = Object.entries(SALES_SOURCE.ORDER_CHANNEL).map(
    ([key, label]) => {
      const found = data.items.find((item) => item.orderChannel === key);
      return {
        salesSource: label,
        salesAmount: found ? found.salesAmount : 0,
        orderCount: found ? found.orderCount : 0,
        deltaShare: found ? found.deltaShare : 0,
      };
    },
  );
  return {
    orderChannelData,
  };
};
