import { useQuery, useQueryClient } from '@tanstack/react-query';

import { dailyReportOptions } from '@/services/daily-report';
import { formatDateISO } from '@/utils/shared';

interface UseDailyReportContentOptions {
  selectedDate?: Date;
}

export const useDailyReportContent = ({
  selectedDate,
}: UseDailyReportContentOptions) => {
  const queryClient = useQueryClient();

  const now = new Date();
  const targetDate = selectedDate ?? now;

  // 캘린더에서 매출이 없으면 리포트 조회 요청 안 함
  const calendarData = queryClient.getQueryData(
    dailyReportOptions.calendar(targetDate).queryKey,
  );
  const targetDateString = formatDateISO(targetDate);
  const todaySales =
    calendarData?.monthlySales?.find((item) => item.date === targetDateString)
      ?.netSales ?? undefined;

  const { data: content } = useQuery({
    ...dailyReportOptions.content(formatDateISO(targetDate)),
    enabled: calendarData === undefined || todaySales !== undefined,
  });

  const existsReport = todaySales !== undefined && content !== undefined;

  return {
    existsReport,
    content,
  };
};
