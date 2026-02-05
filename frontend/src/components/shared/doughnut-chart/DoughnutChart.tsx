import { useMemo } from 'react';

import { RANKING_COLORS } from '@/constants/shared/doughnut-chart';
import type { DoughnutChartItem } from '@/types/shared';
import {
  computeChartDataWithPercentage,
  getAnimationDuration,
  getArcLength,
  getCoordinates,
  getDegreeFromPercentage,
  getSVGPath,
  getTextColor,
} from '@/utils/shared/doughnut-chart';

import { DonutSegment } from './DonutSegment';
import { DoughnutLabel } from './DoughnutLabel';

interface DoughnutChartProps {
  chartData: DoughnutChartItem[];
  animationDuration?: number;
}

export const DoughnutChart = ({
  chartData,
  animationDuration = 500,
}: DoughnutChartProps) => {
  const VIEW_RADIUS = 180;
  const VIEW_SIZE = VIEW_RADIUS * 2;
  const CLIP_RADIUS = 100;
  const STROKE_WIDTH = VIEW_RADIUS - CLIP_RADIUS;
  const DONUT_RADIUS = CLIP_RADIUS + STROKE_WIDTH / 2;
  const MIN_ARC_LENGTH_FOR_LABEL = 45;

  const chartDataWithPercentage = useMemo(
    () => computeChartDataWithPercentage(chartData),
    [chartData],
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
    >
      {chartDataWithPercentage.map((data, index) => {
        // 누적 백분율 계산
        const cumulativePercentage = chartDataWithPercentage
          .slice(0, index)
          .reduce((sum, item) => sum + item.percentage, 0);
        const cumulativeDegree = getDegreeFromPercentage(cumulativePercentage);

        // 현재 세그먼트의 각도 계산
        const degree = getDegreeFromPercentage(data.percentage);
        // 현재 세그먼트의 SVG Path 계산
        const path = getSVGPath(
          degree,
          cumulativeDegree,
          DONUT_RADIUS,
          VIEW_RADIUS,
        );

        // 현재 세그먼트의 호 길이
        const arcLength = getArcLength(degree, DONUT_RADIUS);
        // 원주 계산
        const circumference = getArcLength(360, DONUT_RADIUS);

        // 애니메이션 지속 시간 계산
        const currentAnimationDuration = getAnimationDuration(
          degree,
          animationDuration,
        );
        const cumulativeAnimationDuration = getAnimationDuration(
          cumulativeDegree,
          animationDuration,
        );

        // 현재 세그먼트의 중앙으로 라벨 좌표 계산
        const { x: LABEL_X, y: LABEL_Y } = getCoordinates(
          cumulativeDegree + degree / 2,
          DONUT_RADIUS,
          VIEW_RADIUS,
        );

        // 색상 및 텍스트 색상 결정
        const color = data.color ?? RANKING_COLORS[index]; // 디폴트: 랭킹에 따른 색상
        const textColor = getTextColor(color);

        return (
          <g key={data.label}>
            <DonutSegment
              path={path}
              strokeWidth={STROKE_WIDTH}
              color={color}
              arcLength={arcLength}
              circumference={circumference}
              currentAnimationDuration={currentAnimationDuration}
              cumulativeAnimationDuration={cumulativeAnimationDuration}
            />

            {arcLength > MIN_ARC_LENGTH_FOR_LABEL && (
              <DoughnutLabel
                x={LABEL_X}
                y={LABEL_Y}
                label={data.percentage}
                textColor={textColor}
                currentAnimationDuration={currentAnimationDuration}
                cumulativeAnimationDuration={cumulativeAnimationDuration}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
