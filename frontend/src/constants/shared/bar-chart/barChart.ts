export const BAR_CHART = {
  TICK_HEIGHT: 11,
  GUIDE_LINE_STROKE_WIDTH: 1.5,
  XAXIS_STROKE_WIDTH: 1.5,
  XAXIS_Y_OFFSET: 28,
  DEFAULT_BAR_COLOR: '#212121', // 기본 막대 색상
  ACTIVATED_BAR_COLOR: '#009AFA', // 활성화 되었을 때 막대 색상
  X_AXIS_LABEL_OFFSET: 5,
  BAR_RADIUS: 4, // 바 상단 모서리 둥글기
  ANIMATION_DURATION_MS: 500, // 바 움직이는 에니메이션의 지속 시간
};

export const STACK_BAR_CHART = {
  TOP_RANK: 3,
  // 막대 각 조각의 정해진 색상이 없다면  순위별 색상 고정
  RANK_COLOR: [
    'var(--color-brand-500)',
    'var(--color-brand-300)',
    'var(--color-brand-100)',
    'var(--color-brand-50)',
  ],
};
