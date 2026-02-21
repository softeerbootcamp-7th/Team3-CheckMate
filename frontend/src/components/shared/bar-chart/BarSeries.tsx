import { BAR_CHART } from '@/constants/shared';
import type {
  BarChartDatum,
  BarChartSeries,
  Coordinate,
  StackBarDatum,
} from '@/types/shared';
import type { AllBarChartSeries } from '@/types/shared';
import {
  checkIsStackBarChart,
  getBarHeight,
  getBarWidth,
  getLabelContentText,
} from '@/utils/shared';

import { Bar } from './Bar';
import { BarLabel } from './BarLabel';
import { StackBar } from './StackBar';

interface BarSeriesProps {
  coordinate: Coordinate[];
  color?: string;
  hasGradient?: boolean;
  gradientId?: string;
  primarySeries: AllBarChartSeries;
  secondarySeries?: AllBarChartSeries;
  activeTooltip: boolean;
  hasBarLabel?: boolean;
  viewBoxHeight: number;
  viewBoxWidth: number;
  hasXAxis?: boolean; //현재 barchart에서 x축 사용하고 있는지
  tooltipContent?: (...args: string[]) => string;
  xCoordinate: Coordinate[];
  activeDataIndex?: number; // 현재 포커스된 데이터의 인덱스
  barColorChangeOnHover?: boolean; // 바 호버 시 색상 변경할 건지
}

export const BarSeries = ({
  coordinate,
  color = BAR_CHART.DEFAULT_BAR_COLOR,
  hasGradient = false,
  primarySeries,
  secondarySeries,
  hasBarLabel = false,
  hasXAxis = false,
  viewBoxHeight,
  viewBoxWidth,
  xCoordinate,
  tooltipContent,
  activeTooltip,
  activeDataIndex,
  barColorChangeOnHover,
}: BarSeriesProps) => {
  const { BAR_RADIUS } = BAR_CHART; // X축이 있을 때 X축의 Y좌표 오프셋 값

  // 스택바 그래프인지 일반 바 그래프인지 -> mainY의 값이 배열이면 스택바
  const isStackBar = checkIsStackBarChart({ series: primarySeries });

  return (
    <>
      {coordinate.map(({ x, y }, index) => {
        if (x !== null && y !== null) {
          const barHeight = getBarHeight({ y, hasXAxis, viewBoxHeight });
          const barWidth = getBarWidth({
            viewBoxWidth,
            xDataLength: xCoordinate.length,
          }); // 막대 너비는 막대 간격의 50%
          // 막대 그래프 툴팁에 넣을 내용
          const tooltipContentText = tooltipContent
            ? tooltipContent(
                (primarySeries as BarChartSeries).data.mainY[
                  index
                ].amount?.toString() ?? '',
                (
                  primarySeries.data.mainY[index] as BarChartDatum
                ).unit?.toString() ?? '',
              )
            : null;
          return (
            <g
              key={primarySeries.data.mainX[index].amount} // 시간대(00시 또는 요일)를 key로 사용
            >
              {secondarySeries && (
                <BarLabel
                  x={x}
                  y={y - BAR_CHART.LABEL_GAP}
                  label={getLabelContentText({
                    isStackBar,
                    isSubLabel: true,
                    index,
                    series: secondarySeries,
                  })}
                  textColor={secondarySeries.color}
                  fontSize={BAR_CHART.SUB_LABEL_FONT_SIZE}
                />
              )}
              {hasBarLabel && (
                <BarLabel
                  x={x}
                  y={y}
                  label={getLabelContentText({
                    isStackBar,
                    index,
                    series: primarySeries,
                  })}
                  textColor={BAR_CHART.LABEL_TEXT_COLOR}
                  fontSize={BAR_CHART.LABEL_FONT_SIZE}
                />
              )}
              {isStackBar ? (
                <StackBar
                  stackBarData={
                    primarySeries.data.mainY[index] as StackBarDatum
                  }
                  barMiddleX={x}
                  barTopY={y}
                  height={barHeight}
                  width={barWidth}
                  radius={BAR_RADIUS}
                  activeTooltip={activeTooltip}
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
                  activeTooltip={activeTooltip}
                  tooltipContentText={tooltipContentText}
                  // activeLastData가 true이라면 마지막 막대를 강조 표시
                  isActive={activeDataIndex === index}
                  barColorChangeOnHover={barColorChangeOnHover}
                />
              )}
            </g>
          );
        }
      })}
    </>
  );
};
