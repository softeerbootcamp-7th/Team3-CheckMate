import { useBarLineChart, useBarLineChartId } from '@/hooks/shared';
import type { BarLineChartSeries, XAxisType } from '@/types/shared';

import { XAxis, XAxisLabel, XGuideLine, YGuideLine } from '../chart';
import { Line, LineChartGradient } from '../line-chart';

import { BarLineSeriesRenderer } from './BarLineSeriesRenderer';

interface BarLineChartProps {
  /**
   * 바 라인 차트의 너비
   */
  viewBoxWidth: number;
  /**
   * 바 라인 차트의 높이
   */
  viewBoxHeight: number;
  /**
   * X축과 X축 레이블 표시 여부
   */
  hasXAxis?: boolean;
  /**
   * X축 가이드 라인 표시 여부 (X축과 수직으로 표시되는 점선, 개수는 x축 데이터와 동일)
   */
  showXGuideLine?: boolean;
  /**
   * Y축 가이드 라인 표시 여부 (Y축과 수평으로 표시되는 점선)
   */
  showYGuideLine?: boolean;
  /**
   * Y축 가이드 라인 개수 (Y축과 수평으로 표시되는 점선의 개수)
   */
  yGuideLineCount: number;
  /**
   * 각 데이터의 툴팁 표시 여부
   */
  activeTooltip?: boolean;
  /**
   * 각 데이터의 툴팁 내용 표시 함수 (실시간 데이터와 평균 데이터의 값을 받아 표시 ex: (mainY, subY) => {mainY} {subY}))
   */
  tooltipContent?: (...args: string[]) => string;
  /**
   * X축 타입 (일반, 양쪽 세로선, 오른쪽 화살표)
   */
  xAxisType: XAxisType;
  /**
   * 바 라인 차트 첫 번쩨 데이터 (실시간 데이터 or 단일 데이터) - 차트의 색상은 primarySeries의 color 속성에 따라 자동으로 설정됨
   * mainX: 차트의 X축 데이터
   * subX: 차트의 X축 데이터 (sub)
   * mainY: 차트의 Y축 데이터 (bar)
   * subY: 차트의 Y축 데이터 (line)
   */
  barLineChartSeries: BarLineChartSeries;
  /**
   * 바 라인 차트의 제목
   */
  chartTitle?: string;
  /**
   * 바 라인 차트의 설명
   */
  chartDescription?: string;
}

export const BarLineChart = ({
  viewBoxWidth,
  viewBoxHeight,
  hasXAxis = false,
  showXGuideLine = false,
  showYGuideLine = false,
  yGuideLineCount,
  activeTooltip = false,
  tooltipContent = (...args: string[]) => args.join(' '),
  xAxisType,
  barLineChartSeries,
  chartTitle,
  chartDescription,
}: BarLineChartProps) => {
  const { titleId, descId, lineGradientId } = useBarLineChartId();
  const {
    svgRef,
    xAxisRef,
    svgWidth,
    adjustedHeight,
    xLabelList,
    xCoordinate,
    barCoordinate,
    lineCoordinate,
  } = useBarLineChart({
    viewBoxWidth,
    viewBoxHeight,
    barLineChartSeries,
    hasXAxis,
  });

  const seriesLength = Math.min(
    barLineChartSeries.data.mainX.length,
    barCoordinate.length,
    lineCoordinate.length,
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      ref={svgRef}
      role="graphics-document"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <g>
        <title id={titleId}>{chartTitle}</title>
        <desc id={descId}>{chartDescription}</desc>
      </g>
      <LineChartGradient lineGradientId={lineGradientId} />
      {showYGuideLine && (
        <YGuideLine
          svgWidth={svgWidth}
          adjustedHeight={adjustedHeight}
          yGuideLineCount={yGuideLineCount}
        />
      )}
      {showXGuideLine && (
        <XGuideLine xCoordinate={xCoordinate} adjustedHeight={adjustedHeight} />
      )}
      {hasXAxis && (
        <>
          <XAxis
            viewBoxWidth={viewBoxWidth}
            viewBoxHeight={viewBoxHeight}
            axisType={xAxisType}
            ref={xAxisRef}
          />
          <XAxisLabel
            xLabelList={xLabelList}
            xCoordinate={xCoordinate}
            viewBoxHeight={viewBoxHeight}
          />
        </>
      )}
      <Line
        coordinate={lineCoordinate}
        color={barLineChartSeries.color}
        hasGradient={false}
        gradientId={lineGradientId}
      />
      {Array.from({ length: seriesLength }).map((_, index) => {
        if (!barCoordinate[index].y || !lineCoordinate[index].y) {
          return null;
        }
        return (
          <BarLineSeriesRenderer
            key={index}
            barX={barCoordinate[index].x}
            barY={barCoordinate[index].y ?? 0}
            lineX={lineCoordinate[index].x}
            lineY={lineCoordinate[index].y ?? 0}
            color={barLineChartSeries.color}
            tooltipContentText={tooltipContent(
              `${barLineChartSeries.data.mainY[index].amount?.toString() ?? ''}${barLineChartSeries.data.mainY[index].unit?.toString() ?? ''}`,
              `${barLineChartSeries.data.subY[index].amount?.toString() ?? ''}${barLineChartSeries.data.subY[index].unit?.toString() ?? ''}`,
            )}
            hasXAxis={hasXAxis}
            viewBoxHeight={viewBoxHeight}
            viewBoxWidth={viewBoxWidth}
            xCoordinate={xCoordinate}
            activeTooltip={activeTooltip}
          />
        );
      })}
    </svg>
  );
};
