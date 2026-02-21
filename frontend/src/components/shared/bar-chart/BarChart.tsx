import { useBarChart } from '@/hooks/shared';
import { useBarChartId } from '@/hooks/shared';
import type { XAxisType } from '@/types/shared';
import type { AllBarChartSeries } from '@/types/shared';

import { XAxis, XAxisLabel, XGuideLine, YGuideLine } from '../chart';

import { BarSeries } from './BarSeries';
/**
 * @description 막대 차트 컴포넌트 (자세한 사용법은 스토리북 문서 참고)
 */
interface BarChartProps {
  /**
   * 막대 차트의 너비
   */
  viewBoxWidth: number;
  /**
   * 막대 차트의 높이
   */
  viewBoxHeight: number;
  /**
   * X축과 X축 레이블 표시 여부
   */
  hasXAxis?: boolean;
  /**
   * 막대의 그라데이션 표시 여부
   */
  hasBarGradient?: boolean;
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
  yGuideLineCount?: number;
  /**
   * 막대 차트 첫 번쩨 데이터 (실시간 데이터 or 단일 데이터) - 차트의 색상은 primarySeries의 color 속성에 따라 자동으로 설정됨
   */
  primarySeries: AllBarChartSeries;

  /**
   * 막대 차트 두 번쩨 데이터 sub라벨용
   */
  secondarySeries?: AllBarChartSeries;

  /**
   * 각 데이터의 툴팁 표시 여부
   */
  activeTooltip?: boolean;
  /**
   * 각 데이터의 툴팁 내용 표시 함수 (실시간 데이터와 평균 데이터의 값을 받아 표시 ex: (mainY, subY) => {mainY} {subY}))
   */
  tooltipContent?: (...args: string[]) => string;
  /**
   * 막대 차트 제목 (title 태그 내용: 스크린 리더 접근성 시 사용)
   */
  chartTitle?: string;
  /**
   * 막대 차트 설명 (desc 태그 내용: 스크린 리더 접근성 시 사용)
   */
  chartDescription?: string;
  /**
   * X축 타입 (일반, 양쪽 세로선, 오른쪽 화살표)
   */
  xAxisType: XAxisType;
  /**
   * 각 막대 위에 레이블 표시 여부
   */
  hasBarLabel?: boolean;
  /**
   * 현재 포커스된 데이터의 인덱스
   */
  activeDataIndex?: number;
  /**
   * 바 호버 시 색상 변경할 건지
   */
  barColorChangeOnHover?: boolean;
}

export const BarChart = ({
  viewBoxWidth,
  viewBoxHeight,
  hasXAxis = false,
  hasBarGradient = false,
  showXGuideLine = false,
  showYGuideLine = false,
  primarySeries,
  secondarySeries,
  yGuideLineCount = 0,
  activeTooltip = false,
  tooltipContent = (...args: string[]) => args.join(' '),
  chartTitle,
  chartDescription,
  hasBarLabel = true,
  xAxisType,
  activeDataIndex,
  barColorChangeOnHover = true,
}: BarChartProps) => {
  const { titleId, descId } = useBarChartId();

  const {
    svgWidth,
    adjustedHeight,
    xLabelList,
    xCoordinate,
    primaryCoordinate, // 바의 상단 중앙 좌표
    svgRef,
    xAxisRef,
  } = useBarChart({
    viewBoxWidth,
    viewBoxHeight,
    primarySeries,
    hasXAxis,
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width={viewBoxWidth}
      height={viewBoxHeight}
      ref={svgRef}
      role="graphics-document"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <g>
        <title id={titleId}>{chartTitle}</title>
        <desc id={descId}>{chartDescription}</desc>
      </g>

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

      <BarSeries
        coordinate={primaryCoordinate}
        hasGradient={hasBarGradient}
        primarySeries={primarySeries}
        secondarySeries={secondarySeries}
        activeTooltip={activeTooltip}
        viewBoxHeight={viewBoxHeight}
        viewBoxWidth={viewBoxWidth}
        tooltipContent={tooltipContent}
        xCoordinate={xCoordinate}
        hasXAxis={hasXAxis}
        hasBarLabel={hasBarLabel}
        activeDataIndex={activeDataIndex}
        barColorChangeOnHover={barColorChangeOnHover}
      />
    </svg>
  );
};
