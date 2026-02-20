import { Skeleton } from '@/components/shared/shadcn-ui';
import { GRID_COL_SIZE, GRID_ROW_SIZE } from '@/constants/dashboard';

export const DashboardMainSuspense = () => {
  return (
    <div className="mb-10 grid h-181 w-full grid-cols-3 grid-rows-3 gap-5">
      {Array.from({ length: GRID_COL_SIZE * GRID_ROW_SIZE }).map((_, index) => {
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
