import type { DailyReportStatusLabel } from '@/constants/daily-report';

import type { Insight, Kpi } from '../dailyReport';

export interface GetDailyReportContentResponseDto {
  targetDate: string;
  title: {
    fullText: string;
    highlight: string;
  };
  statusLabel: DailyReportStatusLabel;
  kpi: {
    netSales: Kpi;
    orders: Kpi;
    aov: Kpi;
  };
  insights: Insight[];
  strategies: string[];
}
