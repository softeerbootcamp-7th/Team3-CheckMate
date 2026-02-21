import { useSuspenseQuery } from '@tanstack/react-query';

import { RealSalesContent } from '@/components/sales';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetRealSalesResponseDto } from '@/types/sales';

type DashboardRealSalesCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.CURRENT_SALES.items.REAL_SALES
>;

interface DashboardRealSalesCardProps {
  cardCode: DashboardRealSalesCardCodes;
}
export const DashboardRealSalesCard = ({
  cardCode,
}: DashboardRealSalesCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption = createCardDetailQuery<GetRealSalesResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  return (
    <RealSalesContent
      cardCode={cardCode}
      netAmount={data.netAmount}
      changeRate={data.changeRate}
      hasPreviousData={data.hasPreviousData}
    />
  );
};
