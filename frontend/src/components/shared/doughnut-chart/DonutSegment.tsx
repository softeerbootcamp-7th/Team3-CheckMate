interface DonutSegmentProps {
  path: string;
  strokeWidth: number;
  color: string;
  arcLength: number;
  circumference: number;
  currentAnimationDuration: number;
  cumulativeAnimationDuration: number;
}

export const DonutSegment = ({
  path,
  strokeWidth,
  color,
  arcLength,
  circumference,
  currentAnimationDuration,
  cumulativeAnimationDuration,
}: DonutSegmentProps) => {
  return (
    <path
      d={path}
      stroke={color}
      strokeWidth={strokeWidth}
      // 호 길이만큼만 그려지고, (원주 - 호 길이 제오) 만큼은 여백, 원주만큼 추가 여백으로 50% 넘는 세그먼트에 대해서도 여백이 되도록 함
      strokeDasharray={` ${arcLength} ${circumference * 2 - arcLength}`}
      // 호 길이만큼 offset 줘서 안보이게 시작
      strokeDashoffset={arcLength}
      fill="none"
    >
      <animate
        // offset에 대해서 애니메이션 적용 -> 등장 애니메이션
        attributeName="stroke-dashoffset"
        from={arcLength}
        to={0}
        dur={`${currentAnimationDuration}ms`}
        begin={`${cumulativeAnimationDuration}ms`}
        fill="freeze"
      />
    </path>
  );
};
