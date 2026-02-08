import { DailyReportHeader, DailyReportMain } from '@/components/daily-report';

export const DailyReportPage = () => {
  return (
    <div className="mt-32.5 flex flex-col gap-5 pb-29.5">
      <DailyReportHeader />
      <DailyReportMain />
    </div>
  );
};
