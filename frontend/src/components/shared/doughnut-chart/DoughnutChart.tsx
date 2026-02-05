import { RANKING_COLORS } from '@/constants/shared/doughnut-chart';
import type { DoughnutChartItem } from '@/types/shared';

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

  // 100% percentage -> 180도 degree
  const getDegreeFromPercentage = (percentage: number) => {
    const degree = 360 * (percentage / 100); // 0~360도
    return degree;
  };

  const getArcLength = (degree: number) => {
    return 2 * Math.PI * DONUT_RADIUS * (degree / 360);
  };

  // 180도 degree -> (x, y) coordinate
  const getCoordinates = (degree: number) => {
    const radian = (degree / 180) * Math.PI;

    // 0도 시작점은 원의 상단 중앙, 시계방향으로 증가
    const adjustedRadian = Math.PI / 2 - radian;

    const x = DONUT_RADIUS * Math.cos(adjustedRadian) + VIEW_RADIUS;
    const y = -DONUT_RADIUS * Math.sin(adjustedRadian) + VIEW_RADIUS; // svg 뷰포트에서 y축 양방향은 아래쪽임
    return { x, y };
  };

  const getPath = (degree: number, cumulativeDegree: number) => {
    const LARGE_ARC_FLAG = degree > 180 ? 1 : 0;

    const { x: START_X, y: START_Y } = getCoordinates(cumulativeDegree);
    const { x: DELTA_X, y: DELTA_Y } = getCoordinates(
      cumulativeDegree + degree,
    );
    return `M ${START_X} ${START_Y} A ${DONUT_RADIUS} ${DONUT_RADIUS} 0 ${LARGE_ARC_FLAG} 1 ${DELTA_X} ${DELTA_Y}`;
  };

  const getAnimationDuration = (degree: number) => {
    return (animationDuration * degree) / 360;
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
      style={{ backgroundColor: '#fff' }}
    >
      {chartData
        .sort((a, b) => b.percentage - a.percentage)
        .map((data, index) => {
          const cumulativePercentage = chartData
            .slice(0, index)
            .reduce((sum, item) => sum + item.percentage, 0);
          const cumulativeDegree =
            getDegreeFromPercentage(cumulativePercentage);

          const degree = getDegreeFromPercentage(data.percentage);

          const path = getPath(degree, cumulativeDegree);

          const arcLength = getArcLength(degree);
          const circumference = getArcLength(360);

          const currentAnimationDuration = getAnimationDuration(degree);
          const cumulativeAnimationDuration =
            getAnimationDuration(cumulativeDegree);

          const { x: LABEL_X, y: LABEL_Y } = getCoordinates(
            cumulativeDegree + degree / 2,
          );

          // text color 결정 로직 (배경색 대비)
          const MIDDLE_COLOR_HEX = 0x999999; // 기준이 되는 중간계열 배경색 상수
          const color = data.color ?? RANKING_COLORS[index];
          const textColor =
            parseInt(
              color.startsWith('var(')
                ? getComputedStyle(document.documentElement)
                    .getPropertyValue(color.slice(4, -1).trim())
                    .trim()
                    .slice(1)
                : color.slice(1),
              16,
            ) > MIDDLE_COLOR_HEX
              ? 'var(--color-grey-900)'
              : 'var(--color-grey-0)';

          return (
            <g key={data.label}>
              <path
                d={path}
                stroke={color}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={` ${arcLength} ${circumference * 2 - arcLength}`} // 50퍼센트가 넘는 경우에도 빈 공간이 생기도록 원주를 한 번 더 더함
                strokeDashoffset={arcLength}
                fill="none"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from={arcLength}
                  to={0}
                  dur={`${currentAnimationDuration}ms`}
                  begin={`${cumulativeAnimationDuration}ms`}
                  fill="freeze"
                />
              </path>

              {/* TODO 45 매직넘버 분리 필요 */}
              {arcLength > 45 && (
                <text
                  x={LABEL_X}
                  y={LABEL_Y + 9} // line height 보정
                  fill={textColor}
                  textAnchor="middle"
                  opacity={0}
                  fontSize={'24px'}
                  fontWeight={600}
                >
                  {data.percentage}%
                  <animate
                    attributeName="opacity"
                    from={0}
                    to={1}
                    dur={`${currentAnimationDuration / 2}ms`}
                    begin={`${
                      cumulativeAnimationDuration + currentAnimationDuration / 2
                    }ms`}
                    fill="freeze"
                  />
                </text>
              )}
            </g>
          );
        })}
    </svg>
  );
};
