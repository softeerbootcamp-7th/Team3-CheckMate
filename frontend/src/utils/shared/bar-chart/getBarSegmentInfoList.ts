import { STACK_BAR_CHART } from '@/constants/shared/bar-chart/barChart';
import type { StackBarSegment } from '@/types/shared';

interface GetBarSegmentInfoListParams {
  stackBarData: StackBarSegment[];
  barTopY: number;
  barHeight: number;
  totalAmount: number;
}
export const getBarSegmentInfoList = ({
  stackBarData,
  barTopY,
  barHeight,
  totalAmount,
}: GetBarSegmentInfoListParams) => {
  // 스택 내부 데이터를 금액 기준으로 내림차순 정렬
  stackBarData.sort((a, b) => Number(b.amount) - Number(a.amount));
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
      if (index > STACK_BAR_CHART.TOP_RANK) {
        return acc; // 4번째 데이터부터는 기타로 묶이므로 무시
      }

      // 현재 조각 바의 상단 중간 y 좌표
      const currentY = barTopY + (acc.percentage / 100) * barHeight;

      // 현재 조각 바의 % 비율
      const percentage =
        totalAmount > 0
          ? index < STACK_BAR_CHART.TOP_RANK //가장 많이 팔린거 3개 외에는 기타로 묶임
            ? Math.round((amount / totalAmount) * 100 * 10) / 10 // 퍼센트는 소수점 첫째자리까지 반올림
            : 100 - acc.percentage
          : 0;

      // 현재 조각 바의 높이
      const barSegmentHeight = (percentage / 100) * barHeight;

      return {
        percentage: acc.percentage + percentage, // 퍼센트 누적합
        barSegmentInfoList: [
          ...acc.barSegmentInfoList,
          {
            y: currentY,
            barHeight: barSegmentHeight,
            percentage: Math.round(percentage * 10) / 10,
            //가장 많이 팔린거(3개만)개 외에는 기타로 전체 묶임
            label: index >= STACK_BAR_CHART.TOP_RANK ? '기타' : segment.label,
            color: segment.color ?? STACK_BAR_CHART.RANK_COLOR[index],
          },
        ],
      };
    },
    { percentage: 0, barSegmentInfoList: [] }, // 초기값
  ).barSegmentInfoList;
};
