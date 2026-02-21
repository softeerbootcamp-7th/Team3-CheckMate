import { Skeleton } from '@/components/shared/shadcn-ui';

export const DashboardPageLoadingFallback = () => {
  return (
    <div className="flex w-[1060px] flex-col gap-8.5">
      <div className="flex items-center justify-between">
        <Skeleton className="rounded-200 bg-grey-200 h-11 w-71" />
        <div className="flex items-center gap-5">
          <Skeleton className="rounded-200 bg-grey-200 inline-block h-11 w-25" />
          <Skeleton className="rounded-200 bg-grey-200 inline-block h-11 w-25" />
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-3 gap-5">
        <Skeleton className="rounded-400 bg-grey-200 row-span-2 w-85" />
        <Skeleton className="rounded-400 bg-grey-200 h-57 w-85" />
        <Skeleton className="rounded-400 bg-grey-200 h-57 w-85" />
        <Skeleton className="rounded-400 bg-grey-200 h-57 w-85" />
        <Skeleton className="rounded-400 bg-grey-200 h-57 w-85" />
        <Skeleton className="rounded-400 bg-grey-200 h-57 w-85" />
        <Skeleton className="rounded-400 bg-grey-200 h-57 w-85" />
        <Skeleton className="rounded-400 bg-grey-200 h-57 w-85" />
      </div>
    </div>
  );
};
