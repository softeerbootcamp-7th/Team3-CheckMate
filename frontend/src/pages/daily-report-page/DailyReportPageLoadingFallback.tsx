import { Skeleton } from '@/components/shared/shadcn-ui';

export const DailyReportPageLoadingFallback = () => {
  return (
    <div className="flex w-[1060px] flex-col gap-5">
      <div className="flex items-center justify-between">
        <Skeleton className="rounded-200 bg-grey-200 h-15 w-125" />
        <Skeleton className="rounded-200 bg-grey-200 size-15" />
      </div>
      <div className="flex gap-5">
        <Skeleton className="rounded-400 bg-grey-200 h-109.5 w-96.5" />
        <Skeleton className="rounded-400 bg-grey-200 h-176.5 w-162" />
      </div>
    </div>
  );
};
