import { STACK_BAR_CHART } from '@/constants/shared/bar-chart/barChart';
import type { StackBarSegment } from '@/types/shared';

interface GetBarSegmentInfoListParams {
  stackBarData: StackBarSegment[];
  barTopY: number;
  barHeight: number;
  totalAmount: number;
  barSegmentCount: number; // 스택 바를 구성하는 조각 바의 개수
}
export const getBarSegmentInfoList = ({
  stackBarData,
  barTopY,
  barHeight,
  totalAmount,
  barSegmentCount,
}: GetBarSegmentInfoListParams) => {
  return stackBarData.reduce<{
    percentage: number; // 앞에서 부터 누적된 퍼센트
    barSegmentInfoList: {
      y: number;
      barHeight: number;
      percentage: number;
      label: string;
      color?: string;
    }[];
  }>(
    (acc, segment, index) => {
      const amount = Number(segment.amount) || 0;

      // 현재 조각 바의 상단 중간 y 좌표
      const barSegmentY = barTopY + (acc.percentage / 100) * barHeight;

      // 현재 조각 바의 % 비율
      const percentage =
        index === barSegmentCount - 1 // 마지막 조각바의 경우
          ? Math.round(Math.max(0, 100 - acc.percentage) * 10) / 10 // 마지막 조각 바는 나머지 퍼센트를 모두 가져감 (소수점 반올림으로 인한 오차 보정). 음수가 된다명 0으로 처리
          : totalAmount > 0
            ? Math.round((amount / totalAmount) * 100 * 10) / 10 // 퍼센트는 소수점 첫째자리까지 반올림. 여기서 생기는 미세한 오차(+,-)는 마지막 바 조각이 다 떠안고 감
            : 0;

      // 현재 조각 바의 높이
      const barSegmentHeight = (percentage / 100) * barHeight;

      return {
        percentage: acc.percentage + percentage, // 퍼센트 누적합
        barSegmentInfoList: [
          ...acc.barSegmentInfoList,
          {
            y: barSegmentY,
            barHeight: barSegmentHeight,
            percentage,
            label: segment.label,
            color: segment.color ?? STACK_BAR_CHART.RANK_COLOR[index],
          },
        ],
      };
    },
    { percentage: 0, barSegmentInfoList: [] }, // 초기값
  ).barSegmentInfoList;
};
