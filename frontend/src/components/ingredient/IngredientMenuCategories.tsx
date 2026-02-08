import { MenuCategoryItem } from './MenuCategoryItem';

interface IngredientMenuCategoriesProps {
  categories: string[];
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
}

export const IngredientMenuCategories = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: IngredientMenuCategoriesProps) => {
  return (
    <div className="flex">
      {categories.map((category) => (
        <MenuCategoryItem
          key={category}
          categoryName={category}
          isSelected={selectedCategory === category}
          onClickItem={() => setSelectedCategory(category)}
        />
      ))}
    </div>
  );
};
