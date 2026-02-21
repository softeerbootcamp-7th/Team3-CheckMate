import { useSuspenseQuery } from '@tanstack/react-query';

import { dailyReportOptions } from '@/services/daily-report/options';
import { formatDateISO } from '@/utils/shared';

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
  const now = new Date();
  const { data: content } = useSuspenseQuery(
    dailyReportOptions.content(formatDateISO(selectedDate ?? now)),
  );

  if (!content) {
    return <DailyReportEmpty />;
  }

  const { title, statusLabel, kpi, insights, strategies } = content;

  return (
    <div className="overflow-y-auto p-6">
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
