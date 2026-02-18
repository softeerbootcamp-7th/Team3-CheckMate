import { useSuspenseQuery } from '@tanstack/react-query';

import { OrderChannelContent } from '@/components/sales';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetIncomeStructureByOrderChannelResponseDto } from '@/types/sales';

type DashboardIncomeStructureOrderChannelCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.INCOME_STRUCTURE.items.ORDER_CHANNEL
>;

interface DashboardIncomeStructureOrderChannelCardProps {
  cardCode: DashboardIncomeStructureOrderChannelCardCodes;
}

export const DashboardIncomeStructureOrderChannelCard = ({
  cardCode,
}: DashboardIncomeStructureOrderChannelCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetIncomeStructureByOrderChannelResponseDto>(
      cardCode,
    );

  const { data } = useSuspenseQuery(queryOption);

  return (
    <OrderChannelContent
      cardCode={cardCode}
      insight={data.insight}
      items={data.items}
    />
  );
};
