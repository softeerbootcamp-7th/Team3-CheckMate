/**
 * 카드 및 섹션 구조 인터페이스
 */
export interface MetricItem {
  label: string; // 실매출
  cardCodes: string[]; // SLS_01_01, SLS_01_02, ...
}
export interface MetricSection {
  title: string; // 매출 현황
  items: MetricItem[]; // 실매출, 주문건수, 건당평균가,
}
interface MetricTabs {
  tab: string; // 매출분석
  sections: MetricSection[]; // 섹션 배열
}

/**
 * 메인 대시보드 구성 (최종 상수)
 */
const SALES_METRICS: MetricSection[] = [
  {
    title: '매출현황',
    items: [
      {
        label: '실매출',
        cardCodes: ['SLS_01_01', 'SLS_01_02', 'SLS_01_03'],
      },
      {
        label: '주문건수',
        cardCodes: ['SLS_02_01', 'SLS_02_02', 'SLS_02_03'],
      },
      {
        label: '건당 평균가',
        cardCodes: ['SLS_03_01', 'SLS_03_02', 'SLS_03_03'],
      },
    ],
  },
  {
    title: '매출 유입 구조',
    items: [
      {
        label: '판매유형별 매출',
        cardCodes: ['SLS_06_01', 'SLS_06_02', 'SLS_06_03'],
      },
      {
        label: '주문수단별 매출',
        cardCodes: ['SLS_07_01', 'SLS_07_02', 'SLS_07_03'],
      },
      {
        label: '결제수단별 매출',
        cardCodes: ['SLS_08_01', 'SLS_08_02', 'SLS_08_03'],
      },
    ],
  },
  {
    title: '매출 추이',
    items: [
      {
        label: '일별 매출 추이',
        cardCodes: ['SLS_09_04'],
      },
      {
        label: '주별 매출 추이',
        cardCodes: ['SLS_10_07'],
      },
      {
        label: '월별 매출 추이',
        cardCodes: ['SLS_11_07'],
      },
    ],
  },
  {
    title: '매출 패턴',
    items: [
      {
        label: '피크타임',
        cardCodes: ['SLS_13_01'],
      },
      {
        label: '요일별 매출 패턴',
        cardCodes: ['SLS_14_06'],
      },
    ],
  },
];
const MENU_METRICS: MetricSection[] = [
  {
    title: '인기메뉴',
    items: [
      {
        label: '메뉴별 매출 랭킹',
        cardCodes: ['MNU_01_01', 'MNU_01_04', 'MNU_01_05'],
      },
    ],
  },
  {
    title: '메뉴 판매 패턴',
    items: [
      {
        label: '시간대별 메뉴 주문건수',
        cardCodes: ['MNU_03_01'],
      },
      {
        label: '식재료 소진량',
        cardCodes: ['MNU_04_01'],
      },
      {
        label: '인기 메뉴 조합',
        cardCodes: ['MNU_05_04'],
      },
    ],
  },
];
const WEATHER_METRICS: MetricSection[] = [
  {
    title: '날씨예보',
    items: [
      {
        label: '오늘 날씨 예보',
        cardCodes: ['WTH_01_01'],
      },
      {
        label: '오늘 시간별 예보',
        cardCodes: ['WTH_02_01'],
      },
      {
        label: '주간 날씨 예보',
        cardCodes: ['WTH_03_04'],
      },
    ],
  },
  {
    title: '강수 영향도',
    items: [
      {
        label: '강수 인사이트',
        cardCodes: ['WTH_04_07'],
      },
      {
        label: '강수 유무 판매채널별 주문건수 비율',
        cardCodes: ['WTH_05_07'],
      },
      {
        label: '강수 주문수 및 매출 변화',
        cardCodes: ['WTH_06_07'],
      },
    ],
  },
];

export const DASHBOARD_METRICS: MetricTabs[] = [
  { tab: '매출분석', sections: SALES_METRICS },
  { tab: '메뉴분석', sections: MENU_METRICS },
  { tab: '날씨분석', sections: WEATHER_METRICS },
];
