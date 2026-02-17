import { useSuspenseQuery } from '@tanstack/react-query';

import { PopularMenuCombinationCardContent } from '@/components/menu';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetDashboardPopularMenuCombinationResponseDto } from '@/types/menu';

type DashboardPopularMenuCombinationCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.MENU.sections.POPULAR_MENU_COMBINATION.items.POPULAR_MENU_COMBINATION
>;

interface DashboardPopularMenuCombinationCardProps {
  cardCode: DashboardPopularMenuCombinationCardCodes;
}

export const DashboardPopularMenuCombinationCard = ({
  cardCode,
}: DashboardPopularMenuCombinationCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetDashboardPopularMenuCombinationResponseDto>(
      cardCode,
    );

  const { data } = useSuspenseQuery(queryOption);

  return (
    <PopularMenuCombinationCardContent
      firstMenuName={data.firstMenuName}
      secondMenuName={data.secondMenuName}
    />
  );
};
