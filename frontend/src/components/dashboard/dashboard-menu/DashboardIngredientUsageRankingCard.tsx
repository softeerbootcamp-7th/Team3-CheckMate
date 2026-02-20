import { useSuspenseQuery } from '@tanstack/react-query';

import {
  IngredientUsageRankingCardContent,
  IngredientUsageRankingCardContentEmptyView,
} from '@/components/menu';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetIngredientUsageRankingResponseDto } from '@/types/menu';

type DashboardIngredientUsageRankingCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.MENU.sections.INGREDIENT_CONSUMPTION_RANK.items.INGREDIENT_CONSUMPTION_RANK
>;
interface DashboardIngredientUsageRankingCardProps {
  cardCode: DashboardIngredientUsageRankingCardCodes;
}

export const DashboardIngredientUsageRankingCard = ({
  cardCode,
}: DashboardIngredientUsageRankingCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetIngredientUsageRankingResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  if (data.hasIngredient && data.items.length === 0) {
    return <IngredientUsageRankingCardContentEmptyView />;
  }

  return (
    <IngredientUsageRankingCardContent
      hasIngredient={data.hasIngredient}
      items={data.items}
    />
  );
};
