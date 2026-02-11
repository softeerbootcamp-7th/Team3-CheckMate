import { useLineChart, useLineChartId } from '@/hooks/shared';
import type { LineChartSeries } from '@/types/shared';

import { Dots } from './Dots';
import { GradientBackground } from './GradientBackground';
import { Line } from './Line';
import { LineChartGradient } from './LineChartGradient';
import { XAxis } from './XAxis';
import { XAxisLabel } from './XAxisLabel';
import { XGuideLine } from './XGuideLine';
import { YGuideLine } from './YGuideLine';

/**
 * @description 꺾은선 차트 컴포넌트 (자세한 사용법은 스토리북 문서 참고)
 */
interface LineChartProps {
  /**
   * 꺾은선 차트의 너비
   */
  viewBoxWidth: number;
  /**
   * 꺾은선 차트의 높이
   */
  viewBoxHeight: number;
  /**
   * X축과 X축 레이블 표시 여부
   */
  hasXAxis?: boolean;
  /**
   * 꺾은선 차트의 그라데이션 표시 여부 (실시간 + 과거 데이터 표시 시 사용)
   */
  hasGradient?: boolean;
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
   * 꺾은선 차트 첫 번쩨 데이터 (실시간 데이터 or 단일 데이터) - 차트의 색상은 primarySeries의 color 속성에 따라 자동으로 설정됨
   */
  primarySeries: LineChartSeries;
  /**
   * 꺾은선 차트 두 번쩨 데이터 (평균 데이터) - 차트의 색상은 secondarySeries의 color 속성에 따라 자동으로 설정됨
   */
  secondarySeries?: LineChartSeries;
  /**
   * 각 데이터의 툴팁 표시 여부
   */
  activeTooltip?: boolean;
  /**
   * 각 데이터의 툴팁 내용 표시 함수 (실시간 데이터와 평균 데이터의 값을 받아 표시 ex: (mainY, subY) => {mainY} {subY}))
   */
  tooltipContent?: (...args: string[]) => string;
  /**
   * 꺾은선 차트 제목 (title 태그 내용: 스크린 리더 접근성 시 사용)
   */
  chartTitle?: string;
  /**
   * 꺾은선 차트 설명 (desc 태그 내용: 스크린 리더 접근성 시 사용)
   */
  chartDescription?: string;
}

export const LineChart = ({
  viewBoxWidth,
  viewBoxHeight,
  hasXAxis = false,
  hasGradient = false,
  showXGuideLine = false,
  showYGuideLine = false,
  primarySeries,
  secondarySeries,
  yGuideLineCount,
  activeTooltip = false,
  tooltipContent = (...args: string[]) => args.join(' '),
  chartTitle,
  chartDescription,
}: LineChartProps) => {
  const { lineGradientId, backgroundGradientId, titleId, descId } =
    useLineChartId();
  const {
    svgRect,
    adjustedHeight,
    xLabelList,
    xCoordinate,
    lastXCoordinate,
    primaryCoordinate,
    secondaryCoordinate,
    svgRef,
    xAxisRef,
  } = useLineChart({
    primarySeries,
    secondarySeries,
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
      <LineChartGradient
        lineGradientId={lineGradientId}
        backgroundGradientId={backgroundGradientId}
      />
      {hasGradient && (
        <GradientBackground
          adjustedHeight={adjustedHeight}
          lastXCoordinate={lastXCoordinate}
          gradientId={backgroundGradientId}
        />
      )}
      {showYGuideLine && (
        <YGuideLine
          svgRect={svgRect}
          adjustedHeight={adjustedHeight}
          yGuideLineCount={yGuideLineCount}
        />
      )}
      {showXGuideLine && (
        <XGuideLine
          xCoordinate={xCoordinate}
          svgRect={svgRect}
          adjustedHeight={adjustedHeight}
        />
      )}
      {hasXAxis && (
        <>
          <XAxis
            viewBoxWidth={viewBoxWidth}
            viewBoxHeight={viewBoxHeight}
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
        coordinate={primaryCoordinate}
        color={primarySeries.color}
        hasGradient={hasGradient}
        gradientId={lineGradientId}
      />
      <Dots
        series={primarySeries}
        activeTooltip={activeTooltip}
        tooltipContent={tooltipContent}
        coordinate={primaryCoordinate}
        color={primarySeries.color}
      />
      {secondarySeries && (
        <>
          <Line
            coordinate={secondaryCoordinate}
            color={secondarySeries.color}
          />
          <Dots
            series={secondarySeries}
            activeTooltip={activeTooltip}
            tooltipContent={tooltipContent}
            coordinate={secondaryCoordinate}
            color={secondarySeries.color}
          />
        </>
      )}
    </svg>
  );
};
