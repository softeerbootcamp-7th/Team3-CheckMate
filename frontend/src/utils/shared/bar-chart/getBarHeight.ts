import { BAR_CHART } from '@/constants/shared';

// 막대 높이 계산:
// `y`(막대 상단)부터 x축 또는 SVG 하단까지의 세로 거리
export const getBarHeight = ({
  y,
  hasXAxis,
  viewBoxHeight,
}: {
  y: number;
  hasXAxis: boolean;
  viewBoxHeight: number;
}) => {
  const { XAXIS_Y_OFFSET, XAXIS_STROKE_WIDTH } = BAR_CHART;
  const barHeight = hasXAxis
    ? viewBoxHeight - XAXIS_Y_OFFSET - y - XAXIS_STROKE_WIDTH / 2
    : viewBoxHeight - y;

  // 차트가 현재 2번 랜더링 되고 있음(y좌표가 첫번째 렌더링에서는 x축 존재가 무시된 값으로 계산되고 2번째 랜더링에서는 x축 존재가 반영된 값으로 계산됨).
  // 데이터 값이 0인 경우 첫 번째 랜더링에서 바 높이가 음수로 계산되기 때문에 음수인 경우 0으로 조정하는 로직 추가
  const adjustedBarHeight = Math.max(0, barHeight); // 음수인 경우 0으로 조정(막대 높이가 0보다 작은 것 방지)
  return adjustedBarHeight;
};
