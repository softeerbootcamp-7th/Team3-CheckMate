import { DAILY_REPORT_CONTENT_DATA } from '@/mocks/data/daily-report';

import { DailyReportEvaluation } from './DailyReportEvaluation';
import { DailyReportInsight } from './DailyReportInsight';
import { DailyReportKPI } from './DailyReportKPI';
import { DailyReportStrategy } from './DailyReportStrategy';
import { DailyReportTitle } from './DailyReportTitle';

interface DailyReportContentProps {
  selectedDate?: Date;
}
export const DailyReportContent = ({
  selectedDate,
}: DailyReportContentProps) => {
  const content = DAILY_REPORT_CONTENT_DATA; // mock data 사용

  return (
    <div className="bg-special-card-bg rounded-400 h-176.5 w-175 p-6">
      <div className="flex items-center justify-between">
        <DailyReportTitle selectedDate={selectedDate} title={content.title} />
        <DailyReportEvaluation status_label={content.status_label} />
      </div>

      <div className="mt-6 flex gap-5">
        <DailyReportKPI kpi={content.kpi.net_sales} />
        <DailyReportKPI kpi={content.kpi.orders} />
        <DailyReportKPI kpi={content.kpi.aov} />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5">
        <DailyReportInsight insights={content.insights} />
        <DailyReportStrategy strategies={content.strategies} />
      </div>
    </div>
  );
};
