import { SelectItem } from '@/components/shared/shadcn-ui';
import type { Ingredient } from '@/types/ingredient';
import { convertServerUnitToUiUnit } from '@/utils/ingredient';
import { cn } from '@/utils/shared';

interface IngredientUnitSelectItemProps {
  unit: Ingredient['unit'];
  isLast?: boolean;
}

export const IngredientUnitSelectItem = ({
  unit,
  isLast,
}: IngredientUnitSelectItemProps) => {
  return (
    <SelectItem
      value={unit}
      className={cn(
        'body-medium-semibold text-grey-900 border-grey-300 flex h-9 w-19 justify-center border-b p-250',
        isLast && 'border-0',
      )}
    >
      {convertServerUnitToUiUnit(unit)}
    </SelectItem>
  );
};
