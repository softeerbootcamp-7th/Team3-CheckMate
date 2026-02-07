import { INGREDIENT_CONSUMPTION_RANK } from '@/constants/menu';
import type { IngredientConsumptionRank } from '@/types/menu';

import { IngredientConsumptionRankItem } from './IngredientConsumptionRankItem';
interface IngredientConsumptionRankListProps {
  ingredientConsumptionRank: IngredientConsumptionRank[];
}

export const IngredientConsumptionRankList = ({
  ingredientConsumptionRank,
}: IngredientConsumptionRankListProps) => {
  return (
    <ul className="flex min-w-0 flex-1 flex-col gap-2">
      {ingredientConsumptionRank.map((rankItem) => {
        const isHighlight =
          rankItem.rank <= INGREDIENT_CONSUMPTION_RANK.HIGHLIGHT_RANK_THRESHOLD;
        return (
          <IngredientConsumptionRankItem
            key={rankItem.rank}
            isHighlight={isHighlight}
            {...rankItem}
          />
        );
      })}
    </ul>
  );
};
