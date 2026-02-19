import { useSuspenseQuery } from '@tanstack/react-query';

import { dailyReportOptions } from '@/services/daily-report/options';
import { formatDateISO } from '@/utils/shared';

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

  const { title, status_label, kpi, insights, strategies } = content;

  return (
    <div className="bg-special-card-bg overflow-y-auto p-6">
      <div className="flex items-center justify-between">
        <DailyReportTitle selectedDate={selectedDate} title={title} />
        <DailyReportEvaluation status_label={status_label} />
      </div>

      <div className="mt-6 flex gap-5">
        <DailyReportKPI kpi={kpi.net_sales} />
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
