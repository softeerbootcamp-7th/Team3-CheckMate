import { TIME_DATA } from './lineChartStoryData';

export const STACK_BAR = {
  color: 'var(--color-grey-400)',
  data: {
    mainX: [
      { amount: '월', unit: '' },
      { amount: '화', unit: '' },
      { amount: '수', unit: '' },
      { amount: '목', unit: '' },
      { amount: '금', unit: '' },
      { amount: '토', unit: '' },
      { amount: '일', unit: '' },
    ],
    mainY: [
      // 월요일: 기본 커피 중심
      [
        { amount: 45, unit: '건', label: '아메리카노' },
        { amount: 12, unit: '건', label: '카페라떼' },
        { amount: 5, unit: '건', label: '샌드위치' },
      ],
      // 화요일: 티/에이드 비중 증가
      [
        { amount: 38, unit: '건', label: '아메리카노' },
        { amount: 22, unit: '건', label: '자몽에이드' },
        { amount: 15, unit: '건', label: '말차라떼' },
        { amount: 7, unit: '건', label: '조각케이크' },
      ],
      // 수요일: 점심시간 폭주 (다양한 메뉴)
      [
        { amount: 5, unit: '건', label: '아메리카노' },
        { amount: 25, unit: '건', label: '카페라떼' },
        { amount: 18, unit: '건', label: '바닐라빈라떼' },
        { amount: 12, unit: '건', label: '베이글' },
        { amount: 8, unit: '건', label: '밀크티' },
      ],
      // 목요일: 데이터가 적은 날 (최소 메뉴)
      [
        { amount: 20, unit: '건', label: '아메리카노' },
        { amount: 5, unit: '건', label: '스무디' },
      ],
      // 금요일: 저녁 파티 준비 (높은 매출)
      [
        { amount: 60, unit: '건', label: '아메리카노' },
        { amount: 40, unit: '건', label: '자몽에이드' },
        { amount: 35, unit: '건', label: '조각케이크' },
        { amount: 15, unit: '건', label: '샌드위치' },
      ],
      // 토요일: 주말 특수 (커피보다 디저트/에이드)
      [
        { amount: 25, unit: '건', label: '아메리카노' },
        { amount: 50, unit: '건', label: '딸기스무디' },
        { amount: 45, unit: '건', label: '초코와플' },
        { amount: 30, unit: '건', label: '자몽에이드' },
        { amount: 20, unit: '건', label: '바닐라빈라떼' },
      ],
      // 일요일: 골고루 분포
      [
        { amount: 30, unit: '건', label: '아메리카노' },
        { amount: 30, unit: '건', label: '카페라떼' },
        { amount: 25, unit: '건', label: '말차라떼' },
        { amount: 25, unit: '건', label: '샌드위치' },
      ],
    ],
  },
};

export const STACK_BAR_HOURLY = {
  color: 'var(--color-grey-400)',
  data: {
    mainX: TIME_DATA,
    mainY: [
      // 월요일: 기본 커피 중심
      [
        { amount: 45, unit: '건', label: '아메리카노' },
        { amount: 12, unit: '건', label: '카페라떼' },
        { amount: 5, unit: '건', label: '샌드위치' },
      ],
      // 화요일: 티/에이드 비중 증가
      [
        { amount: 38, unit: '건', label: '아메리카노' },
        { amount: 22, unit: '건', label: '자몽에이드' },
        { amount: 15, unit: '건', label: '말차라떼' },
        { amount: 7, unit: '건', label: '조각케이크' },
      ],
      // 수요일: 점심시간 폭주 (다양한 메뉴)
      [
        { amount: 5, unit: '건', label: '아메리카노' },
        { amount: 25, unit: '건', label: '카페라떼' },
        { amount: 18, unit: '건', label: '바닐라빈라떼' },
        { amount: 12, unit: '건', label: '베이글' },
        { amount: 8, unit: '건', label: '밀크티' },
      ],
      // 목요일: 데이터가 적은 날 (최소 메뉴)
      [
        { amount: 20, unit: '건', label: '아메리카노' },
        { amount: 5, unit: '건', label: '스무디' },
      ],
      // 금요일: 저녁 파티 준비 (높은 매출)
      [
        { amount: 60, unit: '건', label: '아메리카노' },
        { amount: 40, unit: '건', label: '자몽에이드' },
        { amount: 35, unit: '건', label: '조각케이크' },
        { amount: 15, unit: '건', label: '샌드위치' },
      ],
      // 토요일: 주말 특수 (커피보다 디저트/에이드)
      [
        { amount: 25, unit: '건', label: '아메리카노' },
        { amount: 50, unit: '건', label: '딸기스무디' },
        { amount: 45, unit: '건', label: '초코와플' },
        { amount: 30, unit: '건', label: '자몽에이드' },
        { amount: 20, unit: '건', label: '바닐라빈라떼' },
      ],
      // 일요일: 골고루 분포
      [
        { amount: 30, unit: '건', label: '아메리카노' },
        { amount: 30, unit: '건', label: '카페라떼' },
        { amount: 25, unit: '건', label: '말차라떼' },
        { amount: 25, unit: '건', label: '샌드위치' },
      ],
      // 월요일: 기본 커피 중심
      [
        { amount: 45, unit: '건', label: '아메리카노' },
        { amount: 12, unit: '건', label: '카페라떼' },
        { amount: 5, unit: '건', label: '샌드위치' },
      ],
      // 화요일: 티/에이드 비중 증가
      [
        { amount: 38, unit: '건', label: '아메리카노' },
        { amount: 22, unit: '건', label: '자몽에이드' },
        { amount: 15, unit: '건', label: '말차라떼' },
        { amount: 7, unit: '건', label: '조각케이크' },
      ],
      // 수요일: 점심시간 폭주 (다양한 메뉴)
      [
        { amount: 5, unit: '건', label: '아메리카노' },
        { amount: 25, unit: '건', label: '카페라떼' },
        { amount: 18, unit: '건', label: '바닐라빈라떼' },
        { amount: 12, unit: '건', label: '베이글' },
        { amount: 8, unit: '건', label: '밀크티' },
      ],
      // 목요일: 데이터가 적은 날 (최소 메뉴)
      [
        { amount: 20, unit: '건', label: '아메리카노' },
        { amount: 5, unit: '건', label: '스무디' },
      ],
      // 금요일: 저녁 파티 준비 (높은 매출)
      [
        { amount: 60, unit: '건', label: '아메리카노' },
        { amount: 40, unit: '건', label: '자몽에이드' },
        { amount: 35, unit: '건', label: '조각케이크' },
        { amount: 15, unit: '건', label: '샌드위치' },
      ],
    ],
  },
};
