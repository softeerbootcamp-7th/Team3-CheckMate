import {
  IngredientConsumptionOverview,
  MenuCombinationOverview,
  MenuSalesPatternOverview,
  PopularMenuOverview,
} from '@/components/menu';
export const MenuPage = () => {
  return (
    <div className="my-32.5 flex h-full flex-col gap-12">
      <PopularMenuOverview />
      <MenuSalesPatternOverview />
      <IngredientConsumptionOverview />
      <MenuCombinationOverview />
    </div>
  );
};
