import { Skeleton } from '@/components/shared/shadcn-ui';

export const IngredientSkeleton = () => {
  return (
    <div className="flex h-10.5 gap-2.5">
      <Skeleton className="bg-grey-300 h-full w-53" />
      <Skeleton className="bg-grey-300 h-full w-20" />
      <Skeleton className="bg-grey-300 h-full w-19" />
    </div>
  );
};
