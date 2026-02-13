import { BAR_CHART } from '@/constants/shared';

interface BarLabelProps {
  x: number;
  y: number;
  label: string | number;
  offsetY?: number;
  textColor: string;
  fontSize?: number;
  textAnchor?: 'start' | 'middle' | 'end';
  fontWeight?: number;
}

export const BarLabel = ({
  x,
  y,
  label,
  textColor = '#A2A4A7',
  offsetY = 8,
  fontSize = 12,
  textAnchor = 'middle',
  fontWeight = 500,
}: BarLabelProps) => {
  return (
    <text
      x={0}
      y={0}
      fill={textColor}
      textAnchor={textAnchor}
      fontSize={fontSize}
      fontWeight={fontWeight}
      style={{
        // 픽셀이랑 svg 단위는 다르기 때문에 px로 이동시키면 안되는데... 일단 라벨 이동은 시켜야 해서 px단위로 이동시켰습니다.
        // circle은 x,y가 css 속성이어서 transition이 변화를 탐지 가능한데 text의 x, y는 css속성이 아니라 transition으로 바로 적용 불가
        // transition : x 0.5s ease-in-out, y 0.5s ease-in-out  안먹힘
        transform: `translate(${x}px, ${y - offsetY}px)`,
        transition: `transform ${BAR_CHART.ANIMATION_DURATION_MS}ms ease-in-out`,
      }}
    >
      {label}
    </text>
  );
};
