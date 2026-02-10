import type { GetDailyReportContentResponseDto } from '@/types/daily-report';
import { formatDateLocalized } from '@/utils/shared';

interface DailyReportTitleProps {
  selectedDate?: Date;
  title: GetDailyReportContentResponseDto['title'];
}
export const DailyReportTitle = ({
  selectedDate,
  title,
}: DailyReportTitleProps) => {
  return (
    <div>
      <p className="text-grey-500 body-small-medium mb-0.5">
        {formatDateLocalized(selectedDate ?? new Date())}
      </p>
      <h2 className="title-small-bold text-grey-900 [&>strong]:text-brand-main">
        오늘은 <strong>{title.highlight}</strong> 날이에요.
      </h2>
    </div>
  );
};
