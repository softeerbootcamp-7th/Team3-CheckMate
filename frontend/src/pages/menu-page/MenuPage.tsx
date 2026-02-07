import {
  IngredientConsumptionOverview,
  MenuCombinationOverview,
  MenuSalesPatternOverview,
  PopularMenuOverview,
} from '@/components/menu';
export const MenuPage = () => {
  return (
    <div className="flex size-full flex-col gap-12 py-32.5">
      <PopularMenuOverview />
      <MenuSalesPatternOverview />
      <IngredientConsumptionOverview />
      <MenuCombinationOverview />
    </div>
  );
};
