import { DailyReportHeader, DailyReportMain } from '@/components/daily-report';

export const DailyReportPage = () => {
  return (
    <div className="mt-8 flex flex-col gap-5 pb-10">
      <DailyReportHeader />
      <DailyReportMain />
    </div>
  );
};
