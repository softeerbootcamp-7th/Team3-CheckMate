import { IngredientUsageRankingEmptyView } from '@/components/menu/shared';
import type { IngredientUsage } from '@/types/menu';

import { IngredientConsumptionRankList } from './IngredientConsumptionRankList';

interface IngredientConsumptionRankCardContentProps {
  rankItems1to5: IngredientUsage[];
  rankItems6to10: IngredientUsage[];
  isCustomPeriod: boolean;
  isEmptyRankItems: boolean;
}

export const IngredientConsumptionRankCardContent = ({
  rankItems1to5,
  rankItems6to10,
  isCustomPeriod,
  isEmptyRankItems,
}: IngredientConsumptionRankCardContentProps) => {
  if (isEmptyRankItems) {
    return <IngredientUsageRankingEmptyView isCustomPeriod={isCustomPeriod} />;
  }

  return (
    <div className="flex gap-5">
      <IngredientConsumptionRankList
        ingredientConsumptionRank={rankItems1to5}
        startRank={1}
      />
      <IngredientConsumptionRankList
        ingredientConsumptionRank={rankItems6to10}
        startRank={6}
      />
    </div>
  );
};
