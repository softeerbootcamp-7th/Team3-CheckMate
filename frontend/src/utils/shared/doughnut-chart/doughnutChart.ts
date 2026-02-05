import type { DoughnutChartItem } from '@/types/shared';

export const computeChartDataWithPercentage = (
  chartData: DoughnutChartItem[],
) => {
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);
  if (totalValue === 0) {
    return chartData.map((item) => ({
      label: item.label,
      percentage: 0,
      color: item.color,
    }));
  }

  const mappedData = chartData.map((item) => ({
    ...item,
    percentage: Math.round((item.value / totalValue) * 100),
  }));

  // 백분율 합이 100이 되도록 조정
  const sumPercentage = mappedData.reduce(
    (sum, item) => sum + item.percentage,
    0,
  );
  if (sumPercentage < 100) {
    const difference = 100 - sumPercentage;
    for (let i = 0; i < difference; i++) {
      mappedData[i].percentage++;
    }
  } else if (sumPercentage > 100) {
    const difference = sumPercentage - 100;
    for (let i = 0; i < difference; i++) {
      mappedData[i].percentage--;
    }
  }

  return mappedData;
};

export const getDegreeFromPercentage = (percentage: number) => {
  // 100%일 때 360도이면 시작점과 끝점이 같아서 호가 그려지지 않음 -> 359.99
  return 359.99 * (percentage / 100);
};

export const getArcLength = (degree: number, donutRadius: number) => {
  return (2 * Math.PI * donutRadius * degree) / 360;
};

export const getCoordinates = (
  degree: number,
  donutRadius: number,
  viewRadius: number,
) => {
  const radian = (degree / 180) * Math.PI;
  const adjustedRadian = Math.PI / 2 - radian; // 0도가 12시 방향이 되도록 조정

  const x = donutRadius * Math.cos(adjustedRadian) + viewRadius;
  const y = -donutRadius * Math.sin(adjustedRadian) + viewRadius;
  return { x, y };
};

export const getSVGPath = (
  degree: number,
  cumulativeDegree: number,
  donutRadius: number,
  viewRadius: number,
) => {
  const LARGE_ARC_FLAG = degree > 180 ? 1 : 0;

  const { x: START_X, y: START_Y } = getCoordinates(
    cumulativeDegree,
    donutRadius,
    viewRadius,
  );
  const { x: DELTA_X, y: DELTA_Y } = getCoordinates(
    cumulativeDegree + degree,
    donutRadius,
    viewRadius,
  );
  return `M ${START_X} ${START_Y} A ${donutRadius} ${donutRadius} 0 ${LARGE_ARC_FLAG} 1 ${DELTA_X} ${DELTA_Y}`;
};

export const getAnimationDuration = (
  degree: number,
  animationDuration: number,
) => {
  return (animationDuration * degree) / 360;
};

export const getTextColor = (color: string) => {
  const MIDDLE_COLOR_HEX = 0x999999;

  try {
    const hex = color.startsWith('var(')
      ? getComputedStyle(document.documentElement)
          .getPropertyValue(color.slice(4, -1).trim())
          .trim()
          .slice(1)
      : color.slice(1);
    return parseInt(hex, 16) > MIDDLE_COLOR_HEX
      ? 'var(--color-grey-900)'
      : 'var(--color-grey-0)';
  } catch {
    return 'var(--color-grey-900)';
  }
};
