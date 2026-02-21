import { useSuspenseQuery } from '@tanstack/react-query';

import {
  PayMethodContent,
  PayMethodContentEmptyView,
} from '@/components/sales';
import type {
  DASHBOARD_METRICS,
  ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetSalesSourceByPayMethodResponseDto } from '@/types/sales';

type DashboardSalesSourcePayMethodCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.SALES_SOURCE.items.PAY_METHOD
>;
interface DashboardSalesSourcePayMethodCardProps {
  cardCode: DashboardSalesSourcePayMethodCardCodes;
}

export const DashboardSalesSourcePayMethodCard = ({
  cardCode,
}: DashboardSalesSourcePayMethodCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetSalesSourceByPayMethodResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  if (data.items.length === 0) {
    return <PayMethodContentEmptyView />;
  }

  return (
    <PayMethodContent
      cardCode={cardCode}
      insight={data.insight}
      items={data.items}
    />
  );
};
