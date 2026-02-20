import { INGREDIENT_CONSUMPTION_RANK } from '@/constants/menu';
import type { IngredientUsage } from '@/types/menu';

import { IngredientConsumptionRankItem } from './IngredientConsumptionRankItem';
interface IngredientConsumptionRankListProps {
  ingredientConsumptionRank: IngredientUsage[];
  startRank?: number;
}

export const IngredientConsumptionRankList = ({
  ingredientConsumptionRank,
  startRank = 1,
}: IngredientConsumptionRankListProps) => {
  return (
    <ol className="flex min-w-0 flex-1 flex-col gap-2">
      {ingredientConsumptionRank.map(
        ({ ingredientName, totalQuantity, baseUnit }, index) => {
          const rank = startRank + index;
          const isHighlight =
            rank <= INGREDIENT_CONSUMPTION_RANK.HIGHLIGHT_RANK_THRESHOLD;
          return (
            <IngredientConsumptionRankItem
              key={rank}
              rank={rank}
              isHighlight={isHighlight}
              ingredientName={ingredientName}
              totalQuantity={totalQuantity}
              baseUnit={baseUnit}
            />
          );
        },
      )}
    </ol>
  );
};
