import { Tabs, TabsList, TabsTrigger } from '@/components/shared/shadcn-ui';

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
  const firstTab = selectedCategory ?? categories[0] ?? '';

  return (
    <Tabs defaultValue={firstTab} onValueChange={setSelectedCategory}>
      <TabsList variant="line">
        {categories.map((category) => (
          <TabsTrigger
            key={category}
            value={category}
            className="title-small-semibold! text-grey-700 data-[state=active]:text-grey-900 data-[state=active]:border-brand-main! h-auto! rounded-none border-x-0 border-t-0! border-b-2! border-transparent px-700! py-250!"
          >
            {category}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
