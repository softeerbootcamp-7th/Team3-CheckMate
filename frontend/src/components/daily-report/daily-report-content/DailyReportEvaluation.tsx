import { DAILY_REPORT_STATUS_LABEL } from '@/constants/daily-report';
import type { GetDailyReportContentResponseDto } from '@/types/daily-report';
import { cn } from '@/utils/shared';

interface DailyReportEvaluationProps {
  status_label: GetDailyReportContentResponseDto['status_label'];
}
export const DailyReportEvaluation = ({
  status_label,
}: DailyReportEvaluationProps) => {
  return (
    <div>
      <span className="text-grey-700 body-medium-semibold mr-2">
        오늘의 총평
      </span>
      <span
        className={cn(
          'rounded-unlimit bg-special-dashboard-bg body-large-bold px-3 py-1.5',
          status_label === DAILY_REPORT_STATUS_LABEL.BEST && 'text-brand-main',
          status_label === DAILY_REPORT_STATUS_LABEL.GOOD && 'text-grey-600',
          status_label === DAILY_REPORT_STATUS_LABEL.WARNING &&
            'text-others-negative',
        )}
      >
        {status_label}
      </span>
    </div>
  );
};
