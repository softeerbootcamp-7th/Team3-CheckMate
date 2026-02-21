import { useSuspenseQuery } from '@tanstack/react-query';

import { AveragePriceContent } from '@/components/sales';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetAveragePriceResponseDto } from '@/types/sales';

type DashboardAveragePriceCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.CURRENT_SALES.items.AVERAGE_PRICE
>;

interface DashboardAveragePriceCardProps {
  cardCode: DashboardAveragePriceCardCodes;
}
export const DashboardAveragePriceCard = ({
  cardCode,
}: DashboardAveragePriceCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetAveragePriceResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  return (
    <AveragePriceContent
      cardCode={cardCode}
      averageOrderAmount={data.averageOrderAmount}
      differenceAmount={data.differenceAmount}
      hasPreviousData={data.hasPreviousData}
    />
  );
};
