import { Skeleton } from '@/components/shared/shadcn-ui';

export const SalesPageLoadingFallback = () => {
  return (
    <div className="flex w-[1060px] flex-col gap-13">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between pt-24.5">
          <Skeleton className="rounded-200 bg-grey-200 h-8 w-151" />
          <Skeleton className="rounded-200 bg-grey-200 h-8 w-80" />
        </div>
        <div className="flex gap-5">
          <Skeleton className="rounded-400 bg-grey-200 h-57 flex-1" />
          <Skeleton className="rounded-400 bg-grey-200 h-57 flex-1" />
          <Skeleton className="rounded-400 bg-grey-200 h-57 flex-1" />
        </div>
        <div className="flex gap-5">
          <Skeleton className="rounded-400 bg-grey-200 h-25 w-107" />
          <Skeleton className="rounded-400 bg-grey-200 h-25 flex-1" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Skeleton className="rounded-200 bg-grey-200 h-8 w-151" />
          <Skeleton className="rounded-200 bg-grey-200 h-8 w-80" />
        </div>
        <div className="flex gap-5">
          <Skeleton className="rounded-400 bg-grey-200 h-[400px] flex-1" />
          <Skeleton className="rounded-400 bg-grey-200 h-[400px] flex-1" />
          <Skeleton className="rounded-400 bg-grey-200 h-[400px] flex-1" />
        </div>
      </div>
    </div>
  );
};
