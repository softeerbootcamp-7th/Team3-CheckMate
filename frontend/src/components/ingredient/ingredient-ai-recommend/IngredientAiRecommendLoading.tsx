import { IngredientSkeleton } from './IngredientSkeleton';

interface IngredientAiRecommendLoadingProps {
  ingredientSkeletonCount: number; // 화면에 보여질 식자재 스켈레톤 컴포넌트 개수
}

export const IngredientAiRecommendLoading = ({
  ingredientSkeletonCount,
}: IngredientAiRecommendLoadingProps) => {
  return (
    <main className="flex-1 p-1">
      <div className="body-medium-semibold! grid auto-rows-[42px] grid-cols-2 gap-x-12 gap-y-6">
        {Array.from({ length: ingredientSkeletonCount }).map((_, index) => (
          <IngredientSkeleton key={index} />
        ))}
      </div>
    </main>
  );
};
