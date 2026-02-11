import { memo } from 'react';

import { LINE_CHART } from '@/constants/shared';

interface XAxisLabelProps {
  viewBoxHeight: number;
  xLabelList: (string | number)[];
  xCoordinate: number[][];
}

export const XAxisLabel = memo(
  ({ viewBoxHeight, xLabelList, xCoordinate }: XAxisLabelProps) => {
    const { X_AXIS_LABEL_OFFSET } = LINE_CHART;
    return (
      <g className="flex justify-between">
        {xCoordinate.map(([x], index) => (
          <text
            key={index}
            x={x ?? 0}
            y={viewBoxHeight - X_AXIS_LABEL_OFFSET}
            textAnchor="middle"
            className="text-grey-900 body-small-medium"
          >
            {xLabelList[index]}
          </text>
        ))}
      </g>
    );
  },
);

XAxisLabel.displayName = 'XAxisLabel';
