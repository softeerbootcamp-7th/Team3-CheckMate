import type { IngredientUsage } from '@/types/menu';

import { IngredientConsumptionRankList } from './IngredientConsumptionRankList';

interface IngredientConsumptionRankCardContentProps {
  rankItems1to5: IngredientUsage[];
  rankItems6to10: IngredientUsage[];
}

export const IngredientConsumptionRankCardContent = ({
  rankItems1to5,
  rankItems6to10,
}: IngredientConsumptionRankCardContentProps) => {
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
