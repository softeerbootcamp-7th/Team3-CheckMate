import { BAR_CHART } from '@/constants/shared';
import type { LabelOption } from '@/types/shared';

interface BarLabelProps {
  x: number;
  y: number;
  label: string | number;
  offsetY?: number;
  labelOptions?: LabelOption; // labelOptions으로 라벨 관련 옵션 한번에 받는다
}

export const BarLabel = ({
  x,
  y,
  label,
  labelOptions,
  offsetY = 8,
}: BarLabelProps) => {
  // labelOptions이 있으면 그 안에서 옵션을 꺼내고 없으면 기본값 사용
  const {
    fontWeight = BAR_CHART.LABEL_FONT_WEIGHT,
    fontSize = BAR_CHART.LABEL_FONT_SIZE,
    textColor = BAR_CHART.LABEL_TEXT_COLOR,
    textAnchor = 'middle',
  } = labelOptions || {};
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
