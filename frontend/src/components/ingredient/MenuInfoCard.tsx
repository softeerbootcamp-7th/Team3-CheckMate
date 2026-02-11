import { useMenuDialog } from '@/hooks/ingredient';
import { formatNumber } from '@/utils/shared';

import { IngredientEditDialog } from './IngredientEditDialog';

interface MenuCardProps {
  menuId: string;
  menuName: string;
  price: number;
  registeredIngredientCount: number; // 해당 메뉴에 등록된 식재료 개수
}

export const MenuInfoCard = ({
  menuId,
  menuName,
  price,
  registeredIngredientCount,
}: MenuCardProps) => {
  const { setIsDialogOpen, isDialogOpen } = useMenuDialog();
  return (
    <>
      <article
        className="bg-special-card-bg rounded-200 flex h-48 w-64 cursor-pointer flex-col justify-between p-6"
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="text-grey-900 flex flex-col gap-1.5">
          <h3 aria-label={menuName} className="title-small-bold">
            {menuName}
          </h3>
          {registeredIngredientCount === 0 && (
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
