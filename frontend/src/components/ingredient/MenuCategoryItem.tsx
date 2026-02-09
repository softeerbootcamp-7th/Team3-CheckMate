import { cn } from '@/utils/shared';

interface MenuCategoryItemProps {
  categoryName: string;
  isSelected?: boolean;
  onClickItem: () => void;
}
export const MenuCategoryItem = ({
  categoryName,
  isSelected = true,
  onClickItem,
}: MenuCategoryItemProps) => {
  return (
    <button
      onClick={onClickItem}
      className={cn(
        'title-small-semibold text-grey-700 cursor-pointer border-b-2 border-transparent px-700 py-250',
        isSelected && 'text-grey-900 border-brand-main',
      )}
    >
      {categoryName}
    </button>
  );
};
