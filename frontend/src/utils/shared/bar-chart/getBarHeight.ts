import { BAR_CHART } from '@/constants/shared';

// 바 전체 높이 계산 (바의 상단 y좌표 부터 x축 또는 svg 하단까지의 거리)
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
    // x축이 있을 때는 x축의 y위치 만큼을 빼고 축 높이의 0.5배 만큼 더 빼줘야 함
    return viewBoxHeight - XAXIS_Y_OFFSET - y - XAXIS_STROKE_WIDTH / 2; // x축이 있을 때 바 높이는 y좌표 ~ x 축까지 거리
  }
  return viewBoxHeight - y; // x축이 없을 떄  바 높이는 y좌표 ~ svg 최하단 까지 거리
};
