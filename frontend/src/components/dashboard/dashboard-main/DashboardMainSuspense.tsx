import { Skeleton } from '@/components/shared/shadcn-ui';

export const DashboardMainSuspense = () => {
  return (
    <div className="mb-10 grid h-181 w-full grid-cols-3 grid-rows-3 gap-5">
      {Array.from({ length: 9 }).map((_, index) => {
        return (
          <Skeleton
            key={`dashboard-card-${index}`}
            className="rounded-400 bg-special-card-bg"
          />
        );
      })}
    </div>
  );
};
