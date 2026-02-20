import { IngredientUsageRankingEmptyView } from '@/components/menu/shared';
import type { IngredientUsage } from '@/types/menu';

import { IngredientConsumptionRankList } from './IngredientConsumptionRankList';

interface IngredientConsumptionRankCardContentProps {
  rankItems1to5: IngredientUsage[];
  rankItems6to10: IngredientUsage[];
  isCustomPeriod: boolean;
}

export const IngredientConsumptionRankCardContent = ({
  rankItems1to5,
  rankItems6to10,
  isCustomPeriod,
}: IngredientConsumptionRankCardContentProps) => {
  if (rankItems1to5.length === 0) {
    return <IngredientUsageRankingEmptyView isCustomPeriod={isCustomPeriod} />;
  }

  return (
    <div className="flex gap-5">
      <IngredientConsumptionRankList
        ingredientConsumptionRank={rankItems1to5}
      />
      <IngredientConsumptionRankList
        ingredientConsumptionRank={rankItems6to10}
      />
    </div>
  );
};
