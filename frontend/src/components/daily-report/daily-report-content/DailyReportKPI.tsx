import { CDN_BASE_URL } from '@/constants/shared';
import type { Kpi } from '@/types/daily-report';
import { cn } from '@/utils/shared';

interface DailyReportKPIProps {
  kpi: Kpi;
}
export const DailyReportKPI = ({ kpi }: DailyReportKPIProps) => {
  const { value, label, diff_val, diff_desc, trend_dir } = kpi;

  return (
    <div className="bg-special-dashboard-bg rounded-400 w-full p-5 pb-4.5">
      <h3 className="text-grey-700 body-medium-semibold">{label}</h3>
      <p className="text-grey-900 title-medium-bold mt-2.75 mb-0.5">{value}</p>
      <div className="flex items-center">
        {(trend_dir === 'up' || trend_dir === 'down') && (
          <object
            data={`${CDN_BASE_URL}/assets/images/${trend_dir}.svg`}
            className="inline size-4"
          />
        )}
        <span
          className={cn(
            'text-grey-500 body-small-semibold',
            trend_dir === 'up' && 'text-brand-main',
            trend_dir === 'down' && 'text-others-negative',
          )}
        >
          {diff_val}
        </span>
        <span className="text-grey-500 caption-large-medium ml-1">
          {diff_desc}
        </span>
      </div>
    </div>
  );
};
