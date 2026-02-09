import type { DailyReportStatusLabel } from '@/constants/daily-report';

interface Kpi {
  label: string; // "실매출",
  value: string; // "{값}원",
  diff_val: string; // "{+N%|-N%|비슷|비교불가}",
  diff_desc: string; // "동요일 대비",
  trend_dir: 'up' | 'down' | 'flat' | 'none'; // "up|down|flat|none"
}
interface Insight {
  idx: number;
  observe: string;
  meaning: string;
  impact: string;
}

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
