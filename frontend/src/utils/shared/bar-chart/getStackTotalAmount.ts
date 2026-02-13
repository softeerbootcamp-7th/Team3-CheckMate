import type { StackBarSegment } from '@/types/shared';

interface GetStackTotalAmountParams {
  stackBarData: StackBarSegment[];
}
export const getStackTotalAmount = ({
  stackBarData,
}: GetStackTotalAmountParams) => {
  return stackBarData.reduce((acc, cur) => acc + (Number(cur.amount) || 0), 0);
};
