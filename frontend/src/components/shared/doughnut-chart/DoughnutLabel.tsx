interface DoughnutLabelProps {
  x: number;
  y: number;
  label: string | number;
  textColor: string;
  currentAnimationDuration: number;
  cumulativeAnimationDuration: number;
}

export const DoughnutLabel = ({
  x,
  y,
  label,
  textColor,
  currentAnimationDuration,
  cumulativeAnimationDuration,
}: DoughnutLabelProps) => {
  return (
    <text
      x={x}
      y={y + 9} // line-height 보정
      fill={textColor}
      textAnchor="middle"
      opacity={0}
      fontSize={'24px'}
      fontWeight={600}
    >
      {label}%
      <animate
        attributeName="opacity"
        from={0}
        to={1}
        dur={`${currentAnimationDuration / 2}ms`} // 중간부터 페이드 인
        begin={`${cumulativeAnimationDuration + currentAnimationDuration / 2}ms`}
        fill="freeze"
      />
    </text>
  );
};
