import { DAILY_REPORT_STATUS_LABEL } from '@/constants/daily-report';
import type { GetDailyReportContentResponseDto } from '@/types/daily-report';
import { cn } from '@/utils/shared';

interface DailyReportEvaluationProps {
  statusLabel: GetDailyReportContentResponseDto['statusLabel'];
}
export const DailyReportEvaluation = ({
  statusLabel,
}: DailyReportEvaluationProps) => {
  return (
    <div>
      <span className="text-grey-700 body-medium-semibold mr-2">
        오늘의 총평
      </span>
      <span
        className={cn(
          'rounded-unlimit bg-special-dashboard-bg body-large-bold px-3 py-1.5',
          statusLabel === DAILY_REPORT_STATUS_LABEL.BEST && 'text-brand-main',
          statusLabel === DAILY_REPORT_STATUS_LABEL.GOOD && 'text-grey-600',
          statusLabel === DAILY_REPORT_STATUS_LABEL.WARNING &&
            'text-others-negative',
        )}
      >
        {statusLabel}
      </span>
    </div>
  );
};
