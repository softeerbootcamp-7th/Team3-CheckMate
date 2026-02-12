// 바 그래프중에서도 스택 바그래프인지 판단하는 유틸

import type { AllBarChartSeries } from '@/types/shared/bar-chart';

interface IsStackBarChartParams {
  series: AllBarChartSeries;
}

// 스택바 그래프인지 일반 바 그래프인지 -> mainY의 값이 배열이면 스택바
export const checkIsStackBarChart = ({ series }: IsStackBarChartParams) => {
  const isStackBar = Array.isArray(series.data.mainY[0]);
  return isStackBar;
};
