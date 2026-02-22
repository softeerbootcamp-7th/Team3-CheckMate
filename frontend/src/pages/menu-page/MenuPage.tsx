import {
  IngredientConsumptionOverview,
  IngredientConsumptionPeriodTypeProvider,
  MenuCombinationOverview,
  MenuCombinationPeriodTypeProvider,
  MenuSalesPatternOverview,
  PopularMenuOverview,
  PopularMenuPeriodTypeProvider,
} from '@/components/menu';
import { MenuSalesPatternPeriodTypeProvider } from '@/components/menu';
import { useMainScrollTop } from '@/hooks/shared';

export const MenuPage = () => {
  const { handleMainScrollToTop } = useMainScrollTop();

  return (
    <div className="my-32.5 flex flex-col gap-12" ref={handleMainScrollToTop}>
      <PopularMenuPeriodTypeProvider>
        <PopularMenuOverview />
      </PopularMenuPeriodTypeProvider>
      <MenuSalesPatternPeriodTypeProvider>
        <MenuSalesPatternOverview />
      </MenuSalesPatternPeriodTypeProvider>
      <IngredientConsumptionPeriodTypeProvider>
        <IngredientConsumptionOverview />
      </IngredientConsumptionPeriodTypeProvider>
      <MenuCombinationPeriodTypeProvider>
        <MenuCombinationOverview />
      </MenuCombinationPeriodTypeProvider>
      <div className="h-32.5 w-full" />
    </div>
  );
};
