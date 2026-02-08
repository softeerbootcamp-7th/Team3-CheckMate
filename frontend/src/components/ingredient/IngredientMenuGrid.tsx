import type { MenuInfo } from '@/types/ingredient';

import { MenuInfoCard } from './MenuInfoCard';

interface IngredientMenuGridProps {
  currentPageMenus: MenuInfo[];
  selectedCategory: string | null;
}
export const IngredientMenuGrid = ({
  currentPageMenus,
  selectedCategory,
}: IngredientMenuGridProps) => {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-3">
      {currentPageMenus.map((menu) => {
        return (
          menu.category === selectedCategory && (
            <MenuInfoCard
              key={menu.id}
              menuId={menu.id}
              menuName={menu.name}
              price={menu.price}
              registeredIngredientCount={menu.registeredIngredientCount}
            />
          )
        );
      })}
    </div>
  );
};
