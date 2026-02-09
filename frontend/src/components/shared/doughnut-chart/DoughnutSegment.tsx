import type { Ref } from 'react';

interface DoughnutSegmentProps {
  ref?: Ref<SVGPathElement>;
  color: string;
  strokeWidth: number;
  path?: string;
}

export const DoughnutSegment = ({
  ref,
  color,
  strokeWidth,
  path,
}: DoughnutSegmentProps) => {
  return (
    <path
      ref={ref}
      d={path ?? ''}
      opacity={1}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
    />
  );
};
