import { useSuspenseQuery } from '@tanstack/react-query';

import { SalesTypeContent } from '@/components/sales';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetIncomeStructureBySalesTypeResponseDto } from '@/types/sales';

type DashboardIncomeStructureSalesTypeCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.INCOME_STRUCTURE.items.SALES_TYPE
>;

interface DashboardIncomeStructureSalesTypeCardProps {
  cardCode: DashboardIncomeStructureSalesTypeCardCodes;
}

export const DashboardIncomeStructureSalesTypeCard = ({
  cardCode,
}: DashboardIncomeStructureSalesTypeCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetIncomeStructureBySalesTypeResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  return (
    <SalesTypeContent
      cardCode={cardCode}
      insight={data.insight}
      items={data.items}
    />
  );
};
