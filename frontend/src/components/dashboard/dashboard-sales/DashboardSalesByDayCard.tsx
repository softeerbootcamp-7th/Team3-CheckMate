import { useSuspenseQuery } from '@tanstack/react-query';

import { SalesByDayContent } from '@/components/sales';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetDetailSalesByDayResponseDto } from '@/types/sales';

type DashboardSalesByDayCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.SALES_PATTERN.items.WEEKDAY_SALES_PATTERN
>;

interface DashboardSalesByDayCardProps {
  cardCode: DashboardSalesByDayCardCodes;
}

export const DashboardSalesByDayCard = ({
  cardCode,
}: DashboardSalesByDayCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetDetailSalesByDayResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  return (
    <SalesByDayContent
      salesByDayItems={data.items}
      topDay={data.topDay}
      isSignificant={data.isSignificant}
    />
  );
};
