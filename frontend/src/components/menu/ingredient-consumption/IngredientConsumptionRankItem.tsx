import { RankBadge } from '@/components/shared';
import type { IngredientUsage } from '@/types/menu';
import { formatNumber } from '@/utils/shared';

interface IngredientConsumptionRankItemProps extends IngredientUsage {
  rank: number;
  isHighlight: boolean;
}

export const IngredientConsumptionRankItem = ({
  rank,
  ingredientName,
  totalQuantity,
  baseUnit,
  isHighlight,
}: IngredientConsumptionRankItemProps) => {
  const formattedTotalQuantity =
    totalQuantity < 0 ? '-' : formatNumber(totalQuantity);
  return (
    <li className="bg-grey-50 rounded-200 border-grey-100 flex min-w-0 items-center gap-3 border p-300">
      <RankBadge
        rank={rank}
        size="sm"
        variant={isHighlight ? 'highlight' : 'default'}
        className="size-7 shrink-0"
      />
      <span className="body-medium-semibold text-grey-900 w-60 min-w-0 truncate">
        {ingredientName}
      </span>
      <div className="flex shrink-0 grow items-center justify-end gap-1">
        <span className="text-grey-900 body-medium-semibold truncate">
          {formattedTotalQuantity}
        </span>
        <span className="text-grey-600 body-medium-medium">{baseUnit}</span>
      </div>
    </li>
  );
};
