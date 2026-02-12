import { BAR_CHART } from '@/constants/shared';
import type { BarChartDatum, Coordinate, StackBarDatum } from '@/types/shared';
import type { AllBarChartSeries } from '@/types/shared';
import { checkIsStackBarChart } from '@/utils/shared';

import { Bar } from './Bar';
import { BarLabel } from './BarLabel';
import { StackBar } from './StackBar';

interface BarSeriesProps {
  coordinate: Coordinate[];
  color?: string;
  hasGradient?: boolean;
  gradientId?: string;
  series: AllBarChartSeries;
  activeTooltip: boolean;
  hasBarLabel?: boolean;
  viewBoxHeight: number;
  viewBoxWidth: number;
  hasXAxis?: boolean; //현재 barchart에서 x축 사용하고 있는지
  tooltipContent?: (...args: string[]) => string;
  xCoordinate: Coordinate[];
}

export const BarSeries = ({
  coordinate,
  color = BAR_CHART.DEFAULT_BAR_COLOR,
  hasGradient = false,
  series,
  hasBarLabel = false,
  hasXAxis = false,
  viewBoxHeight,
  viewBoxWidth,
  xCoordinate,
  tooltipContent,
}: BarSeriesProps) => {
  const { XAXIS_Y_OFFSET, XAXIS_STROKE_WIDTH, BAR_RADIUS } = BAR_CHART; // X축이 있을 때 X축의 Y좌표 오프셋 값

  // 스택바 그래프인지 일반 바 그래프인지 -> mainY의 값이 배열이면 스택바
  const isStackBar = checkIsStackBarChart({ series });

  // 바 전체 높이 계산 (바의 상단 y좌표 부터 x축 또는 svg 하단까지의 거리)
  const getBarHeight = ({
    y,
    hasXAxis,
    viewBoxHeight,
  }: {
    y: number;
    hasXAxis: boolean;
    viewBoxHeight: number;
  }) => {
    if (hasXAxis) {
      // x축이 있을 때는 x축의 y위치 만큼을 빼고 축 높이의 0.5배 만큼 더 빼줘야 함
      return viewBoxHeight - XAXIS_Y_OFFSET - y - XAXIS_STROKE_WIDTH / 2; // x축이 있을 때 바 높이는 y좌표 ~ x 축까지 거리
    }
    return viewBoxHeight - y; // x축이 없을 떄  바 높이는 y좌표 ~ svg 최하단 까지 거리
  };

  // 바 너비는 막대 간격의 50%로 설정 (막대 간격은 viewBoxWidth / x축의 지점 개수)
  const getBarWidth = ({
    viewBoxWidth,
    xCoordinate,
  }: {
    viewBoxWidth: number;
    xCoordinate: Coordinate[];
  }) => {
    return (viewBoxWidth / xCoordinate.length) * 0.5;
  };
  // 바 위에 표시될 라벨 내용 텍스트 생성
  const getLabelContentText = ({
    index,
    series,
  }: {
    index: number;
    series: AllBarChartSeries;
  }) => {
    if (isStackBar) {
      // 스택바 그래프일 때는 mainY의 각 항목이 배열이므로 각 스택의 합계를 계산하여 라벨에 표시
      const stackValues = series.data.mainY[index] as StackBarDatum;
      const total = stackValues.reduce((sum, item) => {
        if (typeof item.amount === 'number') {
          return sum + item.amount;
        }
        return sum;
      }, 0);
      const unit = stackValues[0]?.unit || ''; // 단위는 첫 번째 항목의 단위를 사용
      return `${total} ${unit}`;
    } else {
      // 일반 바 그래프일 때는 mainY의 단일 값을 라벨에 표시
      const value = series.data.mainY[index] as BarChartDatum;
      return `${value.amount} ${value.unit}`;
    }
  };

  return (
    <>
      {coordinate.map(({ x, y }, index) => {
        if (x !== null && y !== null) {
          const barHeight = getBarHeight({ y, hasXAxis, viewBoxHeight });
          const barWidth = getBarWidth({ viewBoxWidth, xCoordinate }); // 막대 너비는 막대 간격의 50%
          return (
            <g
              key={series.data.mainX[index].amount} // 시간대(00시 또는 요일)를 key로 사용
            >
              {hasBarLabel && (
                <BarLabel
                  x={x}
                  y={y}
                  label={getLabelContentText({ index, series })}
                  textColor={BAR_CHART.DEFAULT_BAR_COLOR}
                />
              )}
              {isStackBar ? (
                <StackBar
                  stackBarData={series.data.mainY[index] as StackBarDatum}
                  barMiddleX={x}
                  barTopY={y}
                  height={barHeight}
                  width={barWidth}
                  radius={BAR_RADIUS}
                  tooltipContent={tooltipContent}
                />
              ) : (
                <Bar
                  barMiddleX={x}
                  barTopY={y}
                  height={barHeight}
                  width={barWidth}
                  radius={BAR_RADIUS}
                  hasGradient={hasGradient}
                  bgColor={color}
                />
              )}
            </g>
          );
        }
      })}
    </>
  );
};
