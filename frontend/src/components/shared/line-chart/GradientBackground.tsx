import { memo } from 'react';

interface GradientBackgroundProps {
  adjustedHeight: number;
  lastXCoordinate: number;
  gradientId: string;
}
export const GradientBackground = memo(
  ({
    adjustedHeight,
    lastXCoordinate,
    gradientId,
  }: GradientBackgroundProps) => {
    return (
      <rect
        x={0}
        y={0}
        width={lastXCoordinate}
        height={adjustedHeight}
        fill={`url(#${gradientId})`}
        className="transition-all duration-1000"
      />
    );
  },
);

GradientBackground.displayName = 'GradientBackground';
