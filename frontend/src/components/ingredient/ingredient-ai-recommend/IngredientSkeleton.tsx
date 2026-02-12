import { BoxSkeleton } from '@/components/shared';

export const IngredientSkeleton = () => {
  return (
    <div className="flex h-10.5 gap-2.5">
      <BoxSkeleton classname="h-full w-53" />
      <BoxSkeleton classname="h-full w-20" />
      <BoxSkeleton classname="h-full w-19" />
    </div>
  );
};
