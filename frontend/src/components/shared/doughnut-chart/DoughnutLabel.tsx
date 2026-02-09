import type { Ref } from 'react';

interface DoughnutLabelProps {
  ref: Ref<SVGTextElement>;
  label: string | number;
  textColor: string;
}

export const DoughnutLabel = ({
  ref,
  label,
  textColor,
}: DoughnutLabelProps) => {
  return (
    <text
      ref={ref}
      x={0}
      y={0}
      opacity={0}
      fill={textColor}
      textAnchor="middle"
      fontSize={'24px'}
      fontWeight={600}
    >
      {label}%
    </text>
  );
};
