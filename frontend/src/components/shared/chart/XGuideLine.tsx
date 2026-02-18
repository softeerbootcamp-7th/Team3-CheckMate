import { memo } from 'react';

import { LINE_CHART } from '@/constants/shared';
import type { Coordinate } from '@/types/shared';

interface XGuideLineProps {
  xCoordinate: Coordinate[];
  adjustedHeight: number;
}

export const XGuideLine = memo(
  ({ xCoordinate, adjustedHeight }: XGuideLineProps) => {
    const { TICK_HEIGHT, GUIDE_LINE_STROKE_WIDTH, GUIDE_LINE_DASH_ARRAY } =
      LINE_CHART;

    const xGuideLinePathD = xCoordinate
      .map(({ x }) => {
        return `M ${x} 0 v ${adjustedHeight - TICK_HEIGHT / 2}`;
      })
      .join(' ');

    const xGuideTickPathD = xCoordinate
      .map(({ x }) => {
        return `M ${x} ${adjustedHeight - TICK_HEIGHT / 2} v ${TICK_HEIGHT}`;
      })
      .join(' ');
    return (
      <>
        <path
          d={xGuideLinePathD}
          strokeWidth={GUIDE_LINE_STROKE_WIDTH}
          stroke="currentColor"
          strokeDasharray={GUIDE_LINE_DASH_ARRAY}
          className="text-grey-300"
          aria-hidden="true"
        />
        <path
          d={xGuideTickPathD}
          strokeWidth={GUIDE_LINE_STROKE_WIDTH}
          stroke="currentColor"
          strokeLinecap="round"
          className="text-grey-400"
          aria-hidden="true"
        />
      </>
    );
  },
);

XGuideLine.displayName = 'XGuideLine';
