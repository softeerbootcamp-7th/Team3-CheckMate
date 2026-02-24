import { DailyReportHeader, DailyReportMain } from '@/components/daily-report';

const DailyReportPage = () => {
  return (
    <div className="mt-8 flex flex-col gap-5 pb-10">
      <DailyReportHeader />
      <DailyReportMain />
    </div>
  );
};

export default DailyReportPage;
