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
  if (hasXAxis) {
    // x축이 있으면 바닥 기준은 SVG 하단이 아니라 x축 위치.
    // x축 선 두께가 중심 기준으로 그려지므로, 실제 높이 보정을 위해 stroke의 절반을 추가로 차감.
    return viewBoxHeight - XAXIS_Y_OFFSET - y - XAXIS_STROKE_WIDTH / 2;
  }
  // x축이 없으면 SVG 하단(viewBoxHeight)을 바닥 기준으로 사용.
  return viewBoxHeight - y;
};
