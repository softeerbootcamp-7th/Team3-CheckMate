import { RANKING_COLORS } from '@/constants/shared/doughnut-chart';
export const BAR_CHART = {
  TICK_HEIGHT: 11,
  GUIDE_LINE_STROKE_WIDTH: 1.5,
  XAXIS_STROKE_WIDTH: 1.5,
  XAXIS_Y_OFFSET: 28,
  DEFAULT_BAR_COLOR: 'var(--color-grey-600)', // 기본 막대 색상
  LABEL_TEXT_COLOR: 'var(--color-grey-900)',
  LABEL_FONT_SIZE: 14,
  SUB_LABEL_TEXT_COLOR: 'var(--color-grey-500)',
  SUB_LABEL_FONT_SIZE: 12,
  LABEL_GAP: 20, // 레이블 까리의 간격
  ACTIVATE_BAR_COLOR: 'var(--color-brand-500)', // 활성화 되었을 때 막대 색상
  X_AXIS_LABEL_OFFSET: 5,
  BAR_RADIUS: 4, // 바 상단 모서리 둥글기
  ANIMATION_DURATION_MS: 500, // 바 움직이는 에니메이션의 지속 시간
};

export const STACK_BAR_CHART = {
  TOP_RANK: 3,
  // 막대 각 조각의 정해진 색상이 없다면  순위별 색상 고정
  RANK_COLOR: [
    RANKING_COLORS[0],
    RANKING_COLORS[1],
    RANKING_COLORS[2],
    // '기타' 항목은 아래 색상 사용
    RANKING_COLORS[4],
  ],
};
