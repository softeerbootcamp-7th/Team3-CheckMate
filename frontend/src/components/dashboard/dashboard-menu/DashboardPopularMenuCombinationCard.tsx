import { useSuspenseQuery } from '@tanstack/react-query';

import { PopularMenuCombinationCardContent } from '@/components/menu';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetPopularMenuCombinationResponseDto } from '@/types/menu';

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
    createCardDetailQuery<GetPopularMenuCombinationResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  const firstMenuName = data.items[0]?.baseMenuName;
  const secondMenuName = data.items[0]?.pairedMenus?.[0]?.menuName;

  return (
    <PopularMenuCombinationCardContent
      firstMenuName={firstMenuName}
      secondMenuName={secondMenuName}
    />
  );
};
