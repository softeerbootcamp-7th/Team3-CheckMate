import { DefaultCardWrapper } from '@/components/shared';
import { INGREDIENT_CONSUMPTION_RANK } from '@/constants/menu';
import { ROUTE_PATHS } from '@/constants/shared';
import { ingredientConsumptionRankItems } from '@/mocks/data/menu';

import { LoadMoreDataButton } from '../shared';

import { IngredientConsumptionRankList } from './IngredientConsumptionRankList';

export const IngredientConsumptionRankCard = () => {
  const ingredientConsumptionRank1to5 = ingredientConsumptionRankItems.slice(
    0,
    INGREDIENT_CONSUMPTION_RANK.MAX_DISPLAYED_RANK_ITEMS_1_TO_5,
  );

  const ingredientConsumptionRank6to10 = ingredientConsumptionRankItems.slice(
    INGREDIENT_CONSUMPTION_RANK.MAX_DISPLAYED_RANK_ITEMS_1_TO_5,
    INGREDIENT_CONSUMPTION_RANK.MAX_DISPLAYED_RANK_ITEMS_6_TO_10,
  );
  return (
    <DefaultCardWrapper
      aria-label="식재료 소진량 랭킹"
      title="식재료 소진량 랭킹"
      className="flex h-80 w-full min-w-0 flex-1 flex-col justify-between gap-7.5"
    >
      <div className="flex gap-5">
        <IngredientConsumptionRankList
          ingredientConsumptionRank={ingredientConsumptionRank1to5}
        />
        <IngredientConsumptionRankList
          ingredientConsumptionRank={ingredientConsumptionRank6to10}
        />
      </div>
      <LoadMoreDataButton
        path={`./${ROUTE_PATHS.ANALYSIS.INGREDIENT_CONSUMPTION_RANK}`}
      />
    </DefaultCardWrapper>
  );
};
