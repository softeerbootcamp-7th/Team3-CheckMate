import { SelectItem } from '@/components/shared/shadcn-ui';

interface IngredientUnitSelectItemProps {
  unit: string;
}

export const IngredientUnitSelectItem = ({
  unit,
}: IngredientUnitSelectItemProps) => {
  return (
    <SelectItem
      value={unit}
      className="body-medium-semibold text-grey-900 h-9 w-19 p-250"
    >
      {unit}
    </SelectItem>
  );
};
