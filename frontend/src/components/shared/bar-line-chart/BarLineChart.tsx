import { Bar } from '@/components/shared/bar-chart/Bar';
import { Dot } from '@/components/shared/line-chart/Dot';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/shared/shadcn-ui';
import { BAR_CHART } from '@/constants/shared';
import { useBarLineChart, useBarLineChartId } from '@/hooks/shared';
import type { BarLineChartSeries, XAxisType } from '@/types/shared';
import { getBarHeight, getBarWidth } from '@/utils/shared';

import { XAxis, XAxisLabel, XGuideLine, YGuideLine } from '../chart';
import { Line, LineChartGradient } from '../line-chart';

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
      {Array.from({ length: barLineChartSeries.data.mainX.length }).map(
        (_, index) => {
          const barHeight = getBarHeight({
            y: barCoordinate[index].y ?? 0,
            hasXAxis,
            viewBoxHeight,
          });
          const barWidth = getBarWidth({ viewBoxWidth, xCoordinate });
          const tooltipTriggerMiddle = barCoordinate[index].x ?? 0;
          const tooltipTriggerTop = Math.min(
            barCoordinate[index].y ?? 0,
            lineCoordinate[index].y ?? 0,
          );
          const tooltipTriggerWidth = barWidth;
          const tooltipTriggerHeight = getBarHeight({
            y: Math.min(
              lineCoordinate[index].y ?? 0,
              barCoordinate[index].y ?? 0,
            ),
            hasXAxis,
            viewBoxHeight,
          });

          const bottomY = tooltipTriggerTop + tooltipTriggerHeight;
          const leftX = tooltipTriggerMiddle - tooltipTriggerWidth / 2;
          const rightX = tooltipTriggerMiddle + tooltipTriggerWidth / 2;

          const tooltipTriggerPathd = `
          M ${tooltipTriggerMiddle} ${tooltipTriggerTop}
          H ${leftX}
          V ${bottomY}
          H ${rightX}
          V ${tooltipTriggerTop}
          Z
          `;

          const tooltipContentText = tooltipContent(
            `${barLineChartSeries.data.mainY[index].amount?.toString() ?? ''}${barLineChartSeries.data.mainY[index].unit?.toString() ?? ''}`,
            `${barLineChartSeries.data.subY[index].amount?.toString() ?? ''}${barLineChartSeries.data.subY[index].unit?.toString() ?? ''}`,
          );

          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <g>
                  <path
                    d={tooltipTriggerPathd}
                    fill="transparent"
                    stroke="transparent"
                    className="peer z-1"
                  />
                  <Dot
                    x={lineCoordinate[index].x}
                    y={lineCoordinate[index].y ?? 0}
                    color={barLineChartSeries.color}
                    ariaLabel={`${barLineChartSeries.data.mainX[index].amount} ${barLineChartSeries.data.mainX[index].unit}`}
                    hasHoverEffect
                    className="peer-hover:brightness-75 peer-hover:saturate-200"
                  />
                  <Bar
                    barMiddleX={barCoordinate[index].x ?? 0}
                    barTopY={barCoordinate[index].y ?? 0}
                    width={barWidth}
                    height={barHeight}
                    bgColor={barLineChartSeries.color}
                    radius={BAR_CHART.BAR_RADIUS}
                    hasGradient
                    barColorChangeOnHover
                    className="peer-hover:[&_path]:fill-brand-main"
                  />
                </g>
              </TooltipTrigger>
              <TooltipContent
                side="top"
                className="transition-duration-200 bg-black px-250! text-gray-50 [&_svg]:-translate-y-1 [&_svg]:rotate-0 [&_svg]:text-black"
              >
                <p className="text-grey-0 caption-medium-semibold">
                  {tooltipContentText}
                </p>
              </TooltipContent>
            </Tooltip>
          );
        },
      )}
    </svg>
  );
};
