import type { DailyReportStatusLabel } from '@/constants/daily-report';

import type { Insight, Kpi } from '../dailyReport';

export interface GetDailyReportContentResponseDto {
  report_date: string;
  title: {
    full_text: string;
    highlight: string;
  };
  status_label: DailyReportStatusLabel;
  kpi: {
    net_sales: Kpi;
    orders: Kpi;
    aov: Kpi;
  };
  insights: Insight[];
  strategies: string[];
}
