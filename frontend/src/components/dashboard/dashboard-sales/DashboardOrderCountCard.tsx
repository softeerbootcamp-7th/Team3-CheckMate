import { useSuspenseQuery } from '@tanstack/react-query';

import { OrderCountContent } from '@/components/sales';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetOrderCountResponseDto } from '@/types/sales';

type DashboardOrderCountCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.CURRENT_SALES.items.ORDER_COUNT
>;

interface DashboardOrderCountCardProps {
  cardCode: DashboardOrderCountCardCodes;
}

export const DashboardOrderCountCard = ({
  cardCode,
}: DashboardOrderCountCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption = createCardDetailQuery<GetOrderCountResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  return (
    <OrderCountContent
      cardCode={cardCode}
      orderCount={data.orderCount}
      changeRate={data.changeRate}
      hasPreviousData={data.hasPreviousData}
    />
  );
};
