import type { ChartDatum } from '@/types/shared';
import type { ChartDatumWithLabel } from '@/types/shared/chart';

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
): ChartDatumWithLabel[][] => {
  return items.map((item) =>
    pickList(item).map((menu) => ({
      amount: pickAmount(menu),
      unit,
      label: pickLabel(menu),
    })),
  );
};
