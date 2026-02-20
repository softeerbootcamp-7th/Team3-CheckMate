import { useMenuDialog } from '@/hooks/ingredient';
import type { MenuInfo } from '@/types/ingredient';
import { formatNumber } from '@/utils/shared';

import { IngredientEditDialog } from '../ingredient-edit-dialog';

interface MenuCardProps {
  menuInfo: MenuInfo;
}

export const MenuInfoCard = ({ menuInfo }: MenuCardProps) => {
  const { setIsDialogOpen, isDialogOpen } = useMenuDialog();
  const { menuId, name, price, hasIngredients } = menuInfo;
  return (
    <>
      <article
        className="bg-special-card-bg rounded-200 flex h-48 w-64 cursor-pointer flex-col justify-between p-6"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="text-grey-900 flex flex-col gap-1.5">
          <h3 aria-label={name} className="title-small-bold">
            {name}
          </h3>
          {!hasIngredients && (
            <span className="body-small-semibold text-others-negative">
              식재료 입력 필요
            </span>
          )}
        </div>

        <span className="title-medium-medium text-end">
          {formatNumber(price)} 원
        </span>
      </article>
      <IngredientEditDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        menuId={menuId}
      />
    </>
  );
};
