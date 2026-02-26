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
import { MENU_PERIOD_LOCAL_STORAGE_KEY } from '@/constants/menu';
import { useMainScrollTop } from '@/hooks/shared';

const MenuPage = () => {
  const { handleMainScrollToTop } = useMainScrollTop();

  const {
    popularMenu,
    menuSalesPattern,
    ingredientConsumption,
    menuCombination,
  } = MENU_PERIOD_LOCAL_STORAGE_KEY;

  return (
    <div className="my-32.5 flex flex-col gap-12" ref={handleMainScrollToTop}>
      <PopularMenuPeriodTypeProvider periodKey={popularMenu}>
        <PopularMenuOverview />
      </PopularMenuPeriodTypeProvider>
      <MenuSalesPatternPeriodTypeProvider periodKey={menuSalesPattern}>
        <MenuSalesPatternOverview />
      </MenuSalesPatternPeriodTypeProvider>
      <IngredientConsumptionPeriodTypeProvider
        periodKey={ingredientConsumption}
      >
        <IngredientConsumptionOverview />
      </IngredientConsumptionPeriodTypeProvider>
      <MenuCombinationPeriodTypeProvider periodKey={menuCombination}>
        <MenuCombinationOverview />
      </MenuCombinationPeriodTypeProvider>
      <div className="h-32.5 w-full" />
    </div>
  );
};

export default MenuPage;
