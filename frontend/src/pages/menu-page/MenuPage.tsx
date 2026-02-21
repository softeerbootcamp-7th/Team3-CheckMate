import {
  IngredientConsumptionOverview,
  MenuCombinationOverview,
  MenuSalesPatternOverview,
  PopularMenuOverview,
} from '@/components/menu';
import { IngredientConsumptionPeriodTypeProvider } from '@/components/menu/ingredient-consumption';
import { PopularMenuPeriodTypeProvider } from '@/components/menu/popular-menu';
import { useMainScrollTop } from '@/hooks/shared';

export const MenuPage = () => {
  const { handleMainScrollToTop } = useMainScrollTop();

  return (
    <div className="my-32.5 flex flex-col gap-12" ref={handleMainScrollToTop}>
      <PopularMenuPeriodTypeProvider>
        <PopularMenuOverview />
      </PopularMenuPeriodTypeProvider>
      <PopularMenuPeriodTypeProvider>
        <PopularMenuOverview />
      </PopularMenuPeriodTypeProvider>
      <MenuSalesPatternOverview />
      <IngredientConsumptionPeriodTypeProvider>
        <IngredientConsumptionOverview />
      </IngredientConsumptionPeriodTypeProvider>
      <MenuCombinationOverview />
      <div className="h-32.5 w-full" />
    </div>
  );
};
