import { SelectItem } from '../shared/shadcn-ui';

interface IngredientUnitDropDownMenuItemProps {
  unit: string;
}

export const IngredientUnitSelectItem = ({
  unit,
}: IngredientUnitDropDownMenuItemProps) => {
  return (
    <SelectItem
      value={unit}
      className="body-medium-semibold text-grey-900 h-9 w-19 p-250"
    >
      {unit}
    </SelectItem>
  );
};
