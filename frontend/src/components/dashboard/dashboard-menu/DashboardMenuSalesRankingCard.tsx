import { useSuspenseQuery } from '@tanstack/react-query';

import {
  MenuSalesRankingCardContent,
  MenuSalesRankingCardContentEmptyView,
} from '@/components/menu';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetMenuSalesRankingResponseDto } from '@/types/menu';

type DashboardMenuSalesRankingCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.MENU.sections.POPULAR_MENU.items.MENU_SALES_RANKING
>;

interface DashboardMenuSalesRankingCardProps {
  cardCode: DashboardMenuSalesRankingCardCodes;
}

export const DashboardMenuSalesRankingCard = ({
  cardCode,
}: DashboardMenuSalesRankingCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetMenuSalesRankingResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  if (data.items.length === 0) {
    return <MenuSalesRankingCardContentEmptyView cardCode={cardCode} />;
  }

  return <MenuSalesRankingCardContent items={data.items} />;
};
