import { useId } from 'react';

import { DOUGHNUT_CHART_DEFAULT } from '@/constants/shared';
import { useDoughnutAnimation, useDoughnutSegments } from '@/hooks/shared';
import type { DoughnutChartItem } from '@/types/shared';
import { getSVGPathFromAngle, getTextColor } from '@/utils/shared';

import { DoughnutLabel } from './DoughnutLabel';
import { DoughnutSegment } from './DoughnutSegment';

interface DoughnutChartProps {
  title: string;
  chartData: DoughnutChartItem[];
  animationDuration?: number;
  totalRadius?: number;
  clipRadius?: number;
  minPercentageForLabel?: number;
}

export const DoughnutChart = ({
  title,
  chartData,
  animationDuration = DOUGHNUT_CHART_DEFAULT.ANIMATION_DURATION,
  totalRadius = DOUGHNUT_CHART_DEFAULT.TOTAL_RADIUS,
  clipRadius = DOUGHNUT_CHART_DEFAULT.CLIP_RADIUS,
  minPercentageForLabel = DOUGHNUT_CHART_DEFAULT.MIN_PERCENTAGE_FOR_LABEL, // 라벨을 표시하는 최소 퍼센테이지
}: DoughnutChartProps) => {
  const viewSize = totalRadius * 2;
  const strokeWidth = totalRadius - clipRadius;
  const donutRadius = clipRadius + strokeWidth / 2;

  const titleId = useId();

  const { onFrame, segments, setLabelRef, setSegmentRef } = useDoughnutSegments(
    {
      chartData,
      donutRadius,
      totalRadius,
      minPercentageForLabel,
    },
  );
  useDoughnutAnimation(segments, { onFrame, duration: animationDuration });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${viewSize} ${viewSize}`}
      aria-labelledby={titleId}
    >
      <title id={titleId}>{title}</title>
      {/* 가이드라인 호 */}
      <DoughnutSegment
        color="var(--color-grey-100)"
        strokeWidth={strokeWidth}
        path={getSVGPathFromAngle(
          0,
          DOUGHNUT_CHART_DEFAULT.MAX_DOUGHTNUT_ANGLE,
          donutRadius,
          totalRadius,
        )}
      />

      {segments.map((segment, index) => (
        <g key={segment.label}>
          <DoughnutSegment
            ref={(el) => setSegmentRef(index, el)}
            color={segment.color}
            strokeWidth={strokeWidth}
          />

          {segment.percentage >= minPercentageForLabel && (
            <DoughnutLabel
              ref={(el) => setLabelRef(index, el)}
              label={segment.percentage}
              textColor={getTextColor(segment.color)}
            />
          )}
        </g>
      ))}
    </svg>
  );
};
