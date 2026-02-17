import { useSuspenseQuery } from '@tanstack/react-query';

import { OrderMethodContent } from '@/components/sales';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetIncomeStructureByOrderMethodResponseDto } from '@/types/sales';

type DashboardIncomeStructureOrderMethodCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.INCOME_STRUCTURE.items.ORDER_METHOD
>;

interface DashboardIncomeStructureOrderMethodCardProps {
  cardCode: DashboardIncomeStructureOrderMethodCardCodes;
}

export const DashboardIncomeStructureOrderMethodCard = ({
  cardCode,
}: DashboardIncomeStructureOrderMethodCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetIncomeStructureByOrderMethodResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  return (
    <OrderMethodContent
      cardCode={cardCode}
      insight={data.insight}
      items={data.items}
    />
  );
};
