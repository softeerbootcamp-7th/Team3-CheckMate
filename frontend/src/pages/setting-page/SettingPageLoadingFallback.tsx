import { Skeleton } from '@/components/shared/shadcn-ui';

export const SettingPageLoadingFallback = () => {
  return (
    <div className="mt-12 flex w-[1060px] flex-col gap-8">
      <Skeleton className="rounded-200 bg-grey-200 h-8.5 w-24" />
      <Skeleton className="rounded-400 bg-grey-200 h-128.75 w-full" />
      <div className="flex gap-5">
        <div className="flex flex-1 flex-col gap-4">
          <Skeleton className="rounded-200 bg-grey-200 h-8.5 w-24" />
          <Skeleton className="rounded-400 bg-grey-200 h-16 w-full" />
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <Skeleton className="rounded-200 bg-grey-200 h-8.5 w-24" />
          <Skeleton className="rounded-400 bg-grey-200 h-16 w-full" />
        </div>
      </div>
    </div>
  );
};
