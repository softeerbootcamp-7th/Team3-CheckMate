import { memo, type RefObject } from 'react';

import { LINE_CHART } from '@/constants/shared';
import type { XAxisType } from '@/types/shared';

export interface XAxisProps {
  viewBoxWidth: number;
  viewBoxHeight: number;
  axisType: XAxisType;
  ref: RefObject<SVGPathElement | null>;
}
export const XAxis = memo(
  ({ viewBoxWidth, viewBoxHeight, axisType, ref }: XAxisProps) => {
    const {
      XAXIS_STROKE_WIDTH,
      XAXIS_Y_OFFSET,
      TICK_HEIGHT,
      XAXIS_RIGHT_OFFSET,
      XAXIS_RIGHT_ARROW_X_OFFSET,
      XAXIS_RIGHT_ARROW_Y_OFFSET,
    } = LINE_CHART;

    const xAxisY = viewBoxHeight - XAXIS_Y_OFFSET;

    // x축 왼쪽 세로선
    const leftTickLinePathD = `M ${XAXIS_STROKE_WIDTH / 2} ${xAxisY - TICK_HEIGHT / 2} v ${TICK_HEIGHT}`;
    // x축
    const xAxisLinePathD = `M 0 ${xAxisY} h ${viewBoxWidth - XAXIS_RIGHT_OFFSET}`;
    // x축 오른쪽 세로선
    const rightTickLinePathD = `m -${XAXIS_STROKE_WIDTH / 2} -${TICK_HEIGHT / 2} v ${TICK_HEIGHT}`;
    // x축 오른쪽 화살표
    const rightArrowPathD = `m -${XAXIS_RIGHT_ARROW_X_OFFSET} -${XAXIS_RIGHT_ARROW_Y_OFFSET} L ${viewBoxWidth - XAXIS_RIGHT_OFFSET} ${xAxisY} L ${viewBoxWidth - XAXIS_RIGHT_OFFSET - XAXIS_RIGHT_ARROW_X_OFFSET} ${xAxisY + XAXIS_RIGHT_ARROW_Y_OFFSET}`;

    let xAxisPathD = '';

    switch (axisType) {
      case 'default':
        xAxisPathD = xAxisLinePathD;
        break;
      case 'tick':
        xAxisPathD = `${leftTickLinePathD} ${xAxisLinePathD} ${rightTickLinePathD}`;
        break;
      case 'right-arrow':
        xAxisPathD = `${xAxisLinePathD} ${rightArrowPathD}`;
        break;
      default:
        xAxisPathD = xAxisLinePathD;
    }

    return (
      <path
        d={xAxisPathD}
        strokeWidth={XAXIS_STROKE_WIDTH}
        stroke="currentColor"
        strokeLinecap="round"
        className="text-grey-400"
        aria-hidden="true"
        fill="none"
        ref={ref}
      />
    );
  },
);
XAxis.displayName = 'XAxis';
