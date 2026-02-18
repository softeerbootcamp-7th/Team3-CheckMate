import type { MenuInfo } from '@/types/ingredient';

import { MenuInfoCard } from './MenuInfoCard';

interface IngredientMenuGridProps {
  currentPageMenus: MenuInfo[];
}
export const IngredientMenuGrid = ({
  currentPageMenus,
}: IngredientMenuGridProps) => {
  return (
    <div className="grid grid-cols-4 grid-rows-3 gap-3">
      {currentPageMenus.map((menuInfo) => (
        <MenuInfoCard menuInfo={menuInfo} />
      ))}
    </div>
  );
};
