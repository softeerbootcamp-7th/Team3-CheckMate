import { useCallback, useMemo, useRef } from 'react';

import { DOUGHNUT_CHART_DEFAULT, RANKING_COLORS } from '@/constants/shared';
import type {
  DoughnutChartItem,
  DoughtnutChartItemWithPercentage,
} from '@/types/shared';
import {
  computeChartDataWithPercentage,
  getAngleFromPercentage,
  getCoordinatesFromAngle,
  getSVGPathFromAngle,
} from '@/utils/shared';

import type { Segment, SegmentState } from './useDoughnutAnimation';

interface UseDoughnutSegmentsOptions {
  chartData: DoughnutChartItem[];
  donutRadius: number;
  totalRadius: number;
  minPercentageForLabel: number;
}

export const useDoughnutSegments = ({
  chartData,
  donutRadius,
  totalRadius,
  minPercentageForLabel,
}: UseDoughnutSegmentsOptions) => {
  const segmentRefs = useRef<(SVGPathElement | null)[]>([]);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);

  const chartDataWithPercentage: DoughtnutChartItemWithPercentage[] = useMemo(
    () => computeChartDataWithPercentage(chartData),
    [chartData],
  );

  const segments = useMemo<Segment[]>(() => {
    return chartDataWithPercentage.reduce<{
      segments: Segment[];
      cumulativeAngle: number; // 누적 각도
    }>(
      (acc, data, index) => {
        const angle = getAngleFromPercentage(data.percentage);
        const startAngle = acc.cumulativeAngle;
        const endAngle = acc.cumulativeAngle + angle;
        const midAngle = (startAngle + endAngle) / 2;
        const color =
          data.color ?? RANKING_COLORS[index % RANKING_COLORS.length];

        acc.segments.push({
          startAngle,
          endAngle,
          midAngle,
          color,
          label: data.label,
          percentage: data.percentage,
        });

        acc.cumulativeAngle += angle;
        return acc;
      },
      { segments: [], cumulativeAngle: 0 },
    ).segments;
  }, [chartDataWithPercentage]);

  const onFrame = useCallback(
    (interpolatedStates: SegmentState[]) => {
      interpolatedStates.forEach((interpolatedState, index) => {
        const segmentRef = segmentRefs.current[index];
        const labelRef = labelRefs.current[index];
        const segment = segments[index];

        if (segmentRef) {
          const path = getSVGPathFromAngle(
            interpolatedState.startAngle,
            interpolatedState.endAngle,
            donutRadius,
            totalRadius,
          );
          segmentRef.setAttribute('d', path);
        }

        if (
          labelRef &&
          segment &&
          segment.percentage >= minPercentageForLabel
        ) {
          const { x, y } = getCoordinatesFromAngle(
            interpolatedState.midAngle,
            donutRadius,
            totalRadius,
          );
          labelRef.setAttribute('x', Math.round(x).toString());
          labelRef.setAttribute(
            'y',
            Math.round(y + DOUGHNUT_CHART_DEFAULT.LABEL_Y_OFFSET).toString(),
          );
          labelRef.setAttribute(
            'opacity',
            interpolatedState.labelOpacity.toString(),
          );
        }
      });
    },
    [segments, donutRadius, totalRadius, minPercentageForLabel],
  );

  const setSegmentRef = useCallback(
    (index: number, element: SVGPathElement | null) => {
      segmentRefs.current[index] = element;
    },
    [],
  );

  const setLabelRef = useCallback(
    (index: number, element: SVGTextElement | null) => {
      labelRefs.current[index] = element;
    },
    [],
  );

  return {
    segments,
    onFrame,
    setSegmentRef,
    setLabelRef,
  };
};
