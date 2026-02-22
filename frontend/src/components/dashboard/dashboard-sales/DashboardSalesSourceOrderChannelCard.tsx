import { useSuspenseQuery } from '@tanstack/react-query';

import {
  OrderChannelContent,
  OrderChannelContentEmptyView,
} from '@/components/sales';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetSalesSourceByOrderChannelResponseDto } from '@/types/sales';

type DashboardSalesSourceOrderChannelCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.SALES_SOURCE.items.ORDER_CHANNEL
>;

interface DashboardSalesSourceOrderChannelCardProps {
  cardCode: DashboardSalesSourceOrderChannelCardCodes;
}

export const DashboardSalesSourceOrderChannelCard = ({
  cardCode,
}: DashboardSalesSourceOrderChannelCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetSalesSourceByOrderChannelResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  if (data.items.length === 0) {
    return <OrderChannelContentEmptyView />;
  }

  return (
    <OrderChannelContent
      cardCode={cardCode}
      insight={data.insight}
      items={data.items}
    />
  );
};
