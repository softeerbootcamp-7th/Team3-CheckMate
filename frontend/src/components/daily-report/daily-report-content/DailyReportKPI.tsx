import { CDN_BASE_URL } from '@/constants/shared';
import type { Kpi } from '@/types/daily-report';
import { cn } from '@/utils/shared';

interface DailyReportKPIProps {
  kpi: Kpi;
}
export const DailyReportKPI = ({ kpi }: DailyReportKPIProps) => {
  const { value, label, diffVal, diffDesc, trendDir } = kpi;

  return (
    <div className="bg-special-dashboard-bg rounded-400 w-full p-5 pb-4.5">
      <h3 className="text-grey-700 body-medium-semibold">{label}</h3>
      <p className="text-grey-900 title-medium-bold mt-2.75 mb-0.5">{value}</p>
      <div className="flex items-center">
        {(trendDir === 'up' || trendDir === 'down') && (
          <object
            data={`${CDN_BASE_URL}/assets/images/${trendDir}.svg`}
            className="inline size-4"
          />
        )}
        <span
          className={cn(
            'text-grey-500 body-small-semibold',
            trendDir === 'up' && 'text-brand-main',
            trendDir === 'down' && 'text-others-negative',
            diffVal === '비교불가' && 'caption-large-bold',
          )}
        >
          {diffVal}
        </span>
        <span className="text-grey-500 caption-large-medium ml-1">
          {diffDesc}
        </span>
      </div>
    </div>
  );
};
