import { SelectItem } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface IngredientUnitSelectItemProps {
  unit: string;
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
      {unit}
    </SelectItem>
  );
};
