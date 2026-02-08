import { cn } from '@/utils/shared';

export const MenuCategoryItem = ({
  categoryName,
  isSelected = true,
  onClickItem,
}: {
  categoryName: string;
  isSelected?: boolean;
  onClickItem: () => void;
}) => {
  return (
    <button
      onClick={onClickItem}
      className={cn(
        'title-small-semibold text-grey-700 border-b-2 border-transparent px-700 py-250',
        isSelected && 'text-grey-900 border-brand-main',
      )}
    >
      {categoryName}
    </button>
  );
};
