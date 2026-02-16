import type { ChartDatum } from '@/types/shared';

export const calculateMaximumY = (data: ChartDatum[]) => {
  const totalData = data
    .filter((datum) => datum.amount !== null)
    .map((datum) => Number(datum.amount ?? 0));
  const maximumAmount = totalData.length > 0 ? Math.max(...totalData) : 10;
  const adjustedMaximumAmount =
    Math.ceil(Math.ceil(maximumAmount * 1.5) / 10) * 10;
  return adjustedMaximumAmount;
};
