import type { DeepValueOf, ValueOf } from '@/utils/shared';

import { PERIOD_PRESETS } from '../shared';

/**
 * 차트 유형 상수 및 타입 (s3 이미지 이름과 매칭)
 */
export const CHART_TYPE = {
  DOUGHNUT_CHART: 'doughnut_chart',
  BAR_CHART: 'analysis',
  LINE_CHART: 'line_graph',
  WEATHER: 'weather',
  RAIN: 'precipitation',
  NUMBER: 'number',
} as const;
type ChartType = ValueOf<typeof CHART_TYPE>;

/**
 * 개별 데이터 항목 인터페이스
 */
interface MetricItem {
  code: string; // SLS_01_01
  label: string; // 오늘 실매출
  type: ChartType; // 시각화 유형
  period?: DeepValueOf<typeof PERIOD_PRESETS>; // 오늘, 이번주 등
  sizeX: number; // 가로 크기 (기본값 1)
  sizeY: number; // 세로 크기 (기본값 1)
}
/**
 * 카드 및 섹션 구조 인터페이스
 */
interface AnalysisCard {
  label: string; // 실매출
  items?: MetricItem[]; // 기간별 분기가 필요한 경우
}
interface AnalysisSection {
  title: string; // 매출 현황
  cards: AnalysisCard[]; // 실매출, 주문건수, 건당평균가,
}
interface AnalysisTab {
  tab: string; // 매출분석
  sections: AnalysisSection[]; // 매출현황, 매출유입구조, 매출추이/패턴
}

/**
 * 메인 대시보드 구성 (최종 상수)
 */
export const DASHBOARD_METRICS: AnalysisTab[] = [
  // 1. 매출분석 탭
  {
    tab: '매출분석',
    sections: [
      {
        title: '매출현황',
        cards: [
          {
            label: '실매출',
            items: [
              {
                code: 'SLS_01_01',
                label: '오늘 실매출',
                type: CHART_TYPE.NUMBER,
                period: PERIOD_PRESETS.dayWeekMonth.today,
                sizeX: 1,
                sizeY: 1,
              },
              {
                code: 'SLS_01_02',
                label: '이번주 실매출',
                type: CHART_TYPE.NUMBER,
                period: PERIOD_PRESETS.dayWeekMonth.thisWeek,
                sizeX: 1,
                sizeY: 1,
              },
              {
                code: 'SLS_01_03',
                label: '이번달 실매출',
                type: CHART_TYPE.NUMBER,
                period: PERIOD_PRESETS.dayWeekMonth.thisMonth,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
          {
            label: '주문건수',
            items: [
              {
                code: 'SLS_02_01',
                label: '오늘 주문건수',
                type: CHART_TYPE.NUMBER,
                period: PERIOD_PRESETS.dayWeekMonth.today,
                sizeX: 1,
                sizeY: 1,
              },
              {
                code: 'SLS_02_02',
                label: '이번주 주문건수',
                type: CHART_TYPE.NUMBER,
                period: PERIOD_PRESETS.dayWeekMonth.thisWeek,
                sizeX: 1,
                sizeY: 1,
              },
              {
                code: 'SLS_02_03',
                label: '이번달 주문건수',
                type: CHART_TYPE.NUMBER,
                period: PERIOD_PRESETS.dayWeekMonth.thisMonth,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
          {
            label: '건당 평균가',
            items: [
              {
                code: 'SLS_03_01',
                period: PERIOD_PRESETS.dayWeekMonth.today,
                label: '오늘 건당 평균가',
                type: CHART_TYPE.NUMBER,
                sizeX: 1,
                sizeY: 1,
              },
              {
                code: 'SLS_03_02',
                period: PERIOD_PRESETS.dayWeekMonth.thisWeek,
                label: '이번주 건당 평균가',
                type: CHART_TYPE.NUMBER,
                sizeX: 1,
                sizeY: 1,
              },
              {
                code: 'SLS_03_03',
                period: PERIOD_PRESETS.dayWeekMonth.thisMonth,
                label: '이번달 건당 평균가',
                type: CHART_TYPE.NUMBER,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
        ],
      },
      {
        title: '매출 유입 구조',
        cards: [
          {
            label: '판매유형별 매출',
            items: [
              {
                code: 'SLS_06_01',
                label: '오늘 판매유형별 매출',
                period: PERIOD_PRESETS.dayWeekMonth.today,
                type: CHART_TYPE.DOUGHNUT_CHART,
                sizeX: 1,
                sizeY: 2,
              },
              {
                code: 'SLS_06_02',
                label: '이번주 판매유형별 매출',
                period: PERIOD_PRESETS.dayWeekMonth.thisWeek,
                type: CHART_TYPE.DOUGHNUT_CHART,
                sizeX: 1,
                sizeY: 2,
              },
              {
                code: 'SLS_06_03',
                label: '이번달 판매유형별 매출',
                period: PERIOD_PRESETS.dayWeekMonth.thisMonth,
                type: CHART_TYPE.DOUGHNUT_CHART,
                sizeX: 1,
                sizeY: 2,
              },
            ],
          },
          {
            label: '주문수단별 매출',
            items: [
              {
                code: 'SLS_07_01',
                label: '오늘 주문수단별 매출',
                period: PERIOD_PRESETS.dayWeekMonth.today,
                type: CHART_TYPE.DOUGHNUT_CHART,
                sizeX: 1,
                sizeY: 2,
              },
              {
                code: 'SLS_07_02',
                label: '이번주 주문수단별 매출',
                period: PERIOD_PRESETS.dayWeekMonth.thisWeek,
                type: CHART_TYPE.DOUGHNUT_CHART,
                sizeX: 1,
                sizeY: 2,
              },
              {
                code: 'SLS_07_03',
                label: '이번달 주문수단별 매출',
                period: PERIOD_PRESETS.dayWeekMonth.thisMonth,
                type: CHART_TYPE.DOUGHNUT_CHART,
                sizeX: 1,
                sizeY: 2,
              },
            ],
          },
          {
            label: '결제수단별 매출',
            items: [
              {
                code: 'SLS_08_01',
                label: '오늘 결제수단별 매출',
                period: PERIOD_PRESETS.dayWeekMonth.today,
                type: CHART_TYPE.DOUGHNUT_CHART,
                sizeX: 1,
                sizeY: 2,
              },
              {
                code: 'SLS_08_02',
                label: '이번주 결제수단별 매출',
                period: PERIOD_PRESETS.dayWeekMonth.thisWeek,
                type: CHART_TYPE.DOUGHNUT_CHART,
                sizeX: 1,
                sizeY: 2,
              },
              {
                code: 'SLS_08_03',
                label: '이번달 결제수단별 매출',
                period: PERIOD_PRESETS.dayWeekMonth.thisMonth,
                type: CHART_TYPE.DOUGHNUT_CHART,
                sizeX: 1,
                sizeY: 2,
              },
            ],
          },
        ],
      },
      {
        title: '매출 추이',
        cards: [
          {
            label: '일별 매출 추이',
            items: [
              {
                code: 'SLS_09_04',
                label: '일별 매출 추이',
                period: PERIOD_PRESETS.recentDays7_14_30.recent7Days,
                type: CHART_TYPE.BAR_CHART,
                sizeX: 3,
                sizeY: 1,
              },
            ],
          },
          {
            label: '주별 매출 추이',
            items: [
              {
                code: 'SLS_10_07',
                label: '주별 매출 추이',
                period: PERIOD_PRESETS.recentDays7_14_30.recent14Days,
                type: CHART_TYPE.BAR_CHART,
                sizeX: 3,
                sizeY: 1,
              },
            ],
          },
          {
            label: '월별 매출 추이',
            items: [
              {
                code: 'SLS_11_07',
                label: '월별 매출 추이',
                period: PERIOD_PRESETS.recentDays7_14_30.recent30Days,
                type: CHART_TYPE.BAR_CHART,
                sizeX: 2,
                sizeY: 1,
              },
            ],
          },
        ],
      },
      {
        title: '매출 패턴',
        cards: [
          {
            label: '피크타임',
            items: [
              {
                code: 'SLS_13_01',
                label: '피크타임',
                period: PERIOD_PRESETS.dayWeekMonth.today,
                type: CHART_TYPE.LINE_CHART,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
          {
            label: '요일별 매출 패턴',
            items: [
              {
                code: 'SLS_14_06',
                label: '요일별 매출 패턴',
                period: PERIOD_PRESETS.recent4W.recent4Weeks,
                type: CHART_TYPE.BAR_CHART,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
        ],
      },
    ],
  },

  // 2. 메뉴분석 탭
  {
    tab: '메뉴분석',
    sections: [
      {
        title: '인기메뉴',
        cards: [
          {
            label: '메뉴별 매출 랭킹',
            items: [
              {
                code: 'MNU_01_01',
                label: '오늘 메뉴별 매출 랭킹',
                period: PERIOD_PRESETS.today7_30.today,
                type: CHART_TYPE.NUMBER,
                sizeX: 1,
                sizeY: 1,
              },
              {
                code: 'MNU_01_04',
                label: '최근 7일 메뉴별 매출 랭킹',
                period: PERIOD_PRESETS.today7_30.recent7Days,
                type: CHART_TYPE.NUMBER,
                sizeX: 1,
                sizeY: 1,
              },
              {
                code: 'MNU_01_05',
                label: '최근 30일 메뉴별 매출 랭킹',
                period: PERIOD_PRESETS.today7_30.recent30Days,
                type: CHART_TYPE.NUMBER,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
        ],
      },
      {
        title: '메뉴 판매 패턴',
        cards: [
          {
            label: '시간대별 메뉴 주문건수',
            items: [
              {
                code: 'MNU_03_01',
                label: '오늘 시간대별 메뉴 주문건수',
                period: PERIOD_PRESETS.dayWeekMonth.today,
                type: CHART_TYPE.NUMBER,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
          {
            label: '식재료 소진량',
            items: [
              {
                code: 'MNU_04_01',
                label: '오늘 식재료 소진량',
                period: PERIOD_PRESETS.dayWeekMonth.today,
                type: CHART_TYPE.NUMBER,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
          {
            label: '인기 메뉴 조합',
            items: [
              {
                code: 'MNU_05_04',
                label: '최근 인기 메뉴 조합',
                period: PERIOD_PRESETS.recent7_14.recent7Days,
                type: CHART_TYPE.NUMBER,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
        ],
      },
    ],
  },

  // 3. 날씨분석 탭
  {
    tab: '날씨분석',
    sections: [
      {
        title: '날씨예보',
        cards: [
          {
            label: '오늘 날씨 예보',
            items: [
              {
                code: 'WTH_01_01',
                label: '오늘 날씨 예보',
                period: PERIOD_PRESETS.dayWeekMonth.today,
                type: CHART_TYPE.WEATHER,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
          {
            label: '오늘 시간별 예보',
            items: [
              {
                code: 'WTH_02_01',
                label: '오늘 시간별 예보',
                period: PERIOD_PRESETS.dayWeekMonth.today,
                type: CHART_TYPE.WEATHER,
                sizeX: 2,
                sizeY: 1,
              },
            ],
          },
          {
            label: '주간 날씨 예보',
            items: [
              {
                code: 'WTH_03_04',
                label: '주간 날씨 예보',
                period: PERIOD_PRESETS.recent7_14.recent7Days,
                type: CHART_TYPE.WEATHER,
                sizeX: 3,
                sizeY: 1,
              },
            ],
          },
        ],
      },
      {
        title: '강수 영향도',
        cards: [
          {
            label: '강수 인사이트',
            items: [
              {
                label: '강수 인사이트',
                code: 'WTH_04_07',
                period: PERIOD_PRESETS.recentMonths6_12.recent12Months,
                type: CHART_TYPE.RAIN,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
          {
            label: '강수 유무 판매채널별 주문건수 비율',
            items: [
              {
                label: '강수 유무 판매채널별 주문건수 비율',
                code: 'WTH_05_07',
                period: PERIOD_PRESETS.recentMonths6_12.recent12Months,
                type: CHART_TYPE.RAIN,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
          {
            label: '강수 주문수 및 매출 변화',
            items: [
              {
                label: '강수 주문수 및 매출 변화',
                code: 'WTH_06_07',
                period: PERIOD_PRESETS.recentMonths6_12.recent12Months,
                type: CHART_TYPE.RAIN,
                sizeX: 1,
                sizeY: 1,
              },
            ],
          },
        ],
      },
    ],
  },
] as const;
