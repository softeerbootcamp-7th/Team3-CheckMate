import { useSuspenseQuery } from '@tanstack/react-query';

import { SalesTrendContent } from '@/components/sales';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodesFromSection,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetSalesTrendResponseDto } from '@/types/sales';

type DashboardSalesTrendCardCodes = ExtractCardCodesFromSection<
  typeof DASHBOARD_METRICS.SALES.sections.SALES_TREND
>;

interface DashboardSalesTrendCardProps {
  cardCode: DashboardSalesTrendCardCodes;
}

export const DashboardSalesTrendCard = ({
  cardCode,
}: DashboardSalesTrendCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption = createCardDetailQuery<GetSalesTrendResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  const salesTrendData = {
    data: {
      mainX: data.items.map((item) => ({ amount: item.label, unit: '' })),
      mainY: data.items.map((item) => ({ amount: item.netAmount, unit: '원' })),
      subX: data.items.map((item) => ({ amount: item.label, unit: '' })),
      subY: data.items.map((item) => ({ amount: item.orderCount, unit: '건' })),
    },
    color: 'var(--color-grey-400)',
  };

  return (
    <SalesTrendContent
      cardCode={cardCode}
      salesTrendData={salesTrendData}
      trendChartWidth={1040}
      trendChartHeight={120}
    />
  );
};
