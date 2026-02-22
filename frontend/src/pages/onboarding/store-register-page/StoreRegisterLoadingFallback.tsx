import { Skeleton } from '@/components/shared/shadcn-ui';

export const StoreRegisterLoadingFallback = () => {
  return (
    <div className="flex w-95 flex-col items-center gap-12 pt-32">
      <Skeleton className="rounded-400 bg-grey-200 h-19.5 w-full" />
      <div className="flex w-full flex-col gap-5">
        <Skeleton className="rounded-400 bg-grey-200 h-6.75 w-30" />
        <Skeleton className="rounded-400 bg-grey-200 h-11.75 w-full" />
        <Skeleton className="rounded-400 bg-grey-200 h-12 w-20 self-end" />
      </div>
    </div>
  );
};
