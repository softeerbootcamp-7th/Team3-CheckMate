export interface Kpi {
  label: string; // "실매출",
  value: string; // "{값}원",
  diff_val: string; // "{+N%|-N%|비슷|비교불가}",
  diff_desc: string; // "동요일 대비",
  trend_dir: 'up' | 'down' | 'flat' | 'none'; // "up|down|flat|none"
}
export interface Insight {
  idx: number;
  observe: string;
  meaning: string;
  impact: string;
}
