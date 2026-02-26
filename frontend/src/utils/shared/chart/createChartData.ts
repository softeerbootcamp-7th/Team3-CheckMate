import type { ChartDatum } from '@/types/shared';
import type { ChartDatumWithLabel } from '@/types/shared';

export const createChartData = <T>(
  items: T[],
  pick: (item: T) => string | number,
  unit: string,
): ChartDatum[] => {
  return items.map((item) => ({
    amount: pick(item),
    unit,
  }));
};

export const createChartDataGroupedBy = <T, U>(
  items: T[],
  pickList: (item: T) => U[],
  pickAmount: (item: U) => string | number,
  pickLabel: (item: U) => string,
  unit: string,
  barSegmentCount: number, // 스택바를 구성하는 바 조각의 개수
): ChartDatumWithLabel[][] => {
  return items.map((item) => {
    const chartData = pickList(item).map((menu) => ({
      amount: pickAmount(menu),
      unit,
      label: pickLabel(menu),
    }));

    // 내부 배열의 개수가 barSegmentCount 보다 작으면 빈 객체 추가(0이었던 바 조각에 나중에 유효한 값이 들어오는 경우 애니메이션 연결을 위해)
    while (chartData.length < barSegmentCount) {
      chartData.push({
        amount: 0,
        unit,
        label: '',
      });
    }

    return chartData;
  });
};
