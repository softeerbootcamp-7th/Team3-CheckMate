import { useMenuCard } from '@/hooks/ingredient';

import { IngredientEditDialog } from './IngredientEditDialog';

interface MenuCardProps {
  menuId: string;
  menuName: string;
  price: number;
}

export const MenuInfoCard = ({ menuId, menuName, price }: MenuCardProps) => {
  const { isDialogOpen, setIsDialogOpen } = useMenuCard();
  return (
    <>
      <article
        className="bg-special-card-bg rounded-200 flex h-50 w-64 cursor-pointer flex-col justify-between p-6"
        onClick={() => setIsDialogOpen(true)}
      >
        <p className="title-small-bold">{menuName}</p>
        <p className="text-end">{price} 원</p>
      </article>
      <IngredientEditDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        menuId={menuId}
      />
    </>
  );
};
