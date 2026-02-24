import { useDailyReportContent } from '@/hooks/daily-report';

import { DailyReportEmpty } from './DailyReportEmpty';
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
  const { content } = useDailyReportContent({ selectedDate });

  if (!content) {
    return <DailyReportEmpty />;
  }

  const { title, statusLabel, kpi, insights, strategies } = content;
  return (
    <div className="h-176.5 overflow-y-auto p-6 pb-12">
      <div className="flex items-center justify-between">
        <DailyReportTitle selectedDate={selectedDate} title={title} />
        <DailyReportEvaluation statusLabel={statusLabel} />
      </div>

      <div className="mt-6 flex gap-5">
        <DailyReportKPI kpi={kpi.netSales} />
        <DailyReportKPI kpi={kpi.orders} />
        <DailyReportKPI kpi={kpi.aov} />
      </div>

      <div className="mt-10 grid grid-cols-2 gap-5">
        <DailyReportInsight insights={insights} />
        <DailyReportStrategy strategies={strategies} />
      </div>
    </div>
  );
};
