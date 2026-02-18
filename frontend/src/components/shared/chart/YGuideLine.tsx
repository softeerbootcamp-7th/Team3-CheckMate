import { memo } from 'react';

import { LINE_CHART } from '@/constants/shared';

interface YGuideLineProps {
  svgWidth: number;
  adjustedHeight: number;
  yGuideLineCount: number;
}

export const YGuideLine = memo(
  ({ svgWidth, adjustedHeight, yGuideLineCount }: YGuideLineProps) => {
    const { GUIDE_LINE_STROKE_WIDTH, GUIDE_LINE_DASH_ARRAY } = LINE_CHART;

    const intervalY = adjustedHeight / yGuideLineCount;

    const cordinateYGuideLine = Array.from({ length: yGuideLineCount }).reduce<
      number[][]
    >(
      (acc, _, index) => [
        ...acc,
        [0, index * intervalY + GUIDE_LINE_STROKE_WIDTH / 2],
      ],
      [],
    );

    const pathD = cordinateYGuideLine
      .map(([x, y]) => `M ${x} ${y} h ${svgWidth}`)
      .join(' ');

    return (
      <path
        d={pathD}
        strokeWidth={GUIDE_LINE_STROKE_WIDTH}
        stroke="currentColor"
        strokeDasharray={GUIDE_LINE_DASH_ARRAY}
        className="text-grey-300"
        aria-hidden="true"
      />
    );
  },
);

YGuideLine.displayName = 'YGuideLine';
