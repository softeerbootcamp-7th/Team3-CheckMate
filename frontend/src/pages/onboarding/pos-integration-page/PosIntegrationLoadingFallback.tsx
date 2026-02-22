import { Skeleton } from '@/components/shared/shadcn-ui';

export const PosIntegrationLoadingFallback = () => {
  return (
    <div className="flex w-95 flex-col items-center pt-32">
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="rounded-400 bg-grey-200 h-9.75 w-83.25" />
        <Skeleton className="rounded-400 bg-grey-200 h-13.5 w-129.5" />
      </div>
      <div className="mt-10 flex gap-5">
        <Skeleton className="rounded-400 bg-grey-200 h-49 w-85" />
        <Skeleton className="rounded-400 bg-grey-200 h-49 w-85" />
      </div>
      <Skeleton className="rounded-400 bg-grey-200 mt-4 h-5.5 w-104.5 self-center" />
    </div>
  );
};
