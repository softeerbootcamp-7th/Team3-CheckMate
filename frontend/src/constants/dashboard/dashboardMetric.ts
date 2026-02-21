import { isMetricCardCode, type MetricCardCode } from './dashboardMetricCards';

/**
 * 카드 및 섹션 구조 인터페이스
 */
export interface MetricItem {
  label: string; // 실매출
  cardCodes: readonly MetricCardCode[]; // SLS_01_01, SLS_01_02, ...
}
export interface MetricSection {
  title: string; // 매출 현황
  items: Record<string, MetricItem>; // 실매출, 주문건수, 건당평균가,
}
export interface MetricTabs {
  tab: string; // 매출분석
  sections: Record<string, MetricSection>; // 섹션 정보
}

/**
 * 메인 대시보드 구성 (최종 상수)
 */
const SALES_METRICS = {
  tab: '매출분석',
  sections: {
    CURRENT_SALES: {
      title: '매출현황',
      items: {
        REAL_SALES: {
          label: '실매출',
          cardCodes: ['SLS_01_01', 'SLS_01_02', 'SLS_01_03'] as const,
        },
        ORDER_COUNT: {
          label: '주문건수',
          cardCodes: ['SLS_02_01', 'SLS_02_02', 'SLS_02_03'] as const,
        },
        AVERAGE_PRICE: {
          label: '건당 평균가',
          cardCodes: ['SLS_03_01', 'SLS_03_02', 'SLS_03_03'] as const,
        },
      },
    },
    SALES_SOURCE: {
      title: '매출 유입 구조',
      items: {
        SALES_TYPE: {
          label: '판매유형별 매출',
          cardCodes: ['SLS_06_01', 'SLS_06_02', 'SLS_06_03'] as const,
        },
        ORDER_CHANNEL: {
          label: '주문수단별 매출',
          cardCodes: ['SLS_07_01', 'SLS_07_02', 'SLS_07_03'] as const,
        },
        PAY_METHOD: {
          label: '결제수단별 매출',
          cardCodes: ['SLS_08_01', 'SLS_08_02', 'SLS_08_03'] as const,
        },
      },
    },
    SALES_TREND: {
      title: '매출 추이',
      items: {
        DAILY_SALES_TREND: {
          label: '일별 매출 추이',
          cardCodes: ['SLS_09_04'] as const,
        },
        WEEKLY_SALES_TREND: {
          label: '주별 매출 추이',
          cardCodes: ['SLS_10_07'] as const,
        },
        MONTHLY_SALES_TREND: {
          label: '월별 매출 추이',
          cardCodes: ['SLS_11_07'] as const,
        },
      },
    },
    SALES_PATTERN: {
      title: '매출 패턴',
      items: {
        PEAK_TIME: {
          label: '피크타임',
          cardCodes: ['SLS_13_01'] as const,
        },
        WEEKDAY_SALES_PATTERN: {
          label: '요일별 매출 패턴',
          cardCodes: ['SLS_14_06'] as const,
        },
      },
    },
  },
} as const satisfies MetricTabs;

const MENU_METRICS = {
  tab: '메뉴분석',
  sections: {
    POPULAR_MENU: {
      title: '인기메뉴',
      items: {
        MENU_SALES_RANKING: {
          label: '메뉴별 매출 랭킹',
          cardCodes: ['MNU_01_01', 'MNU_01_04', 'MNU_01_05'] as const,
        },
      },
    },
    MENU_SALES_PATTERN: {
      title: '메뉴 판매 패턴',
      items: {
        TIME_BASED_MENU_ORDER_COUNT: {
          label: '시간대별 메뉴 주문건수',
          cardCodes: ['MNU_03_01'] as const,
        },
      },
    },
    INGREDIENT_CONSUMPTION_RANK: {
      title: '식재료 소진량',
      items: {
        INGREDIENT_CONSUMPTION_RANK: {
          label: '식재료 소진량',
          cardCodes: ['MNU_04_01'] as const,
        },
      },
    },
    POPULAR_MENU_COMBINATION: {
      title: '인기 메뉴 조합',
      items: {
        POPULAR_MENU_COMBINATION: {
          label: '인기 메뉴 조합',
          cardCodes: ['MNU_05_04'] as const,
        },
      },
    },
  },
} as const satisfies MetricTabs;

const WEATHER_METRICS = {
  tab: '날씨분석',
  sections: {
    WEATHER_FORECAST: {
      title: '날씨예보',
      items: {
        TODAY_WEATHER_FORECAST: {
          label: '오늘 날씨 예보',
          cardCodes: ['WTH_01_01'] as const,
        },
        TODAY_WEATHER_FORECAST_HOURLY: {
          label: '오늘 시간별 예보',
          cardCodes: ['WTH_02_01'] as const,
        },
        WEEKLY_WEATHER_FORECAST: {
          label: '주간 날씨 예보',
          cardCodes: ['WTH_03_04'] as const,
        },
      },
    },
    RAIN_INFLUENCE: {
      title: '강수 영향도',
      items: {
        RAIN_INSIGHT: {
          label: '강수 인사이트',
          cardCodes: ['WTH_04_07'] as const,
        },
        ORDER_COUNT_RATIO: {
          label: '강수 유무 판매채널별 주문건수 비율',
          cardCodes: ['WTH_05_07'] as const,
        },
        ORDER_COUNT_AND_SALES_CHANGE: {
          label: '강수 주문수 및 매출 변화',
          cardCodes: ['WTH_06_07'] as const,
        },
      },
    },
  },
} as const satisfies MetricTabs;

export const DASHBOARD_METRICS = {
  SALES: SALES_METRICS,
  MENU: MENU_METRICS,
  WEATHER: WEATHER_METRICS,
} as const satisfies Record<string, MetricTabs>;

/**
 * 주어진 T가 readonly cardCodes 프로퍼티를 가지고 있고
 * cardCodes 프로퍼티의 타입이 MetricCardCode 하위타입의 배열인 경우
 * cardCodes 프로퍼티의 타입을 추출하는 유틸리티 타입
 *
 * @example
 * type RealSalesCardCode = ExtractCardCodes<typeof SALES_METRICS.sections.CURRENT_SALES.items.REAL_SALES>;
 * 결과: 'SLS_01_01' | 'SLS_01_02' | 'SLS_01_03';
 */
export type ExtractCardCodes<T> = T extends {
  readonly cardCodes: readonly (infer U extends MetricCardCode)[];
}
  ? U
  : never;

/**
 * 주어진 T가 MetricSection 타입인 경우
 *
 * MetricSection의 item들의 cardCodes 타입을 추출하는 유틸리티 타입
 *
 * @example
 * type RealSalesCardCode = ExtractCardCodesFromSection<typeof SALES_METRICS.sections.CURRENT_SALES>;
 * 결과: 'SLS_01_01' | 'SLS_01_02' | 'SLS_01_03' | 'SLS_02_01' | 'SLS_02_02' | 'SLS_02_03' | 'SLS_03_01' | 'SLS_03_02' | 'SLS_03_03';
 *
 */
export type ExtractCardCodesFromSection<T> = T extends MetricSection
  ? ExtractCardCodes<T['items'][keyof T['items']]>
  : never;

type ExtractCardCodesFromMetricTabs<T> = T extends MetricTabs
  ? ExtractCardCodesFromSection<T['sections'][keyof T['sections']]>
  : never;

const createMetricCardCodeByCategoryGuard = <M extends MetricTabs>(
  metrics: M,
) => {
  const codesInMetrics = new Set<MetricCardCode>(
    Object.values(metrics.sections).flatMap((section) =>
      Object.values(section.items).flatMap((item) => item.cardCodes),
    ),
  );

  return (code: string): code is ExtractCardCodesFromMetricTabs<M> => {
    return codesInMetrics.has(code as MetricCardCode);
  };
};

export const isSalesMetricCardCode =
  createMetricCardCodeByCategoryGuard(SALES_METRICS);
export const isMenuMetricCardCode =
  createMetricCardCodeByCategoryGuard(MENU_METRICS);

const createMetricCardCodeBySectionItemGuard = <M extends MetricItem>(
  metrics: M,
) => {
  const codesInMetrics = new Set<MetricCardCode>(metrics.cardCodes);

  return (code: string): code is ExtractCardCodes<M> => {
    if (!isMetricCardCode(code)) {
      return false;
    }
    return codesInMetrics.has(code);
  };
};

/**
 * 매출현황 관련 카드 코드 타입 가드
 */
export const isRealSalesMetricCardCode = createMetricCardCodeBySectionItemGuard(
  SALES_METRICS.sections.CURRENT_SALES.items.REAL_SALES,
);
export const isOrderCountMetricCardCode =
  createMetricCardCodeBySectionItemGuard(
    SALES_METRICS.sections.CURRENT_SALES.items.ORDER_COUNT,
  );
export const isAveragePriceMetricCardCode =
  createMetricCardCodeBySectionItemGuard(
    SALES_METRICS.sections.CURRENT_SALES.items.AVERAGE_PRICE,
  );
export const isSalesTypeMetricCardCode = createMetricCardCodeBySectionItemGuard(
  SALES_METRICS.sections.SALES_SOURCE.items.SALES_TYPE,
);
export const isOrderChannelMetricCardCode =
  createMetricCardCodeBySectionItemGuard(
    SALES_METRICS.sections.SALES_SOURCE.items.ORDER_CHANNEL,
  );
export const isPayMethodMetricCardCode = createMetricCardCodeBySectionItemGuard(
  SALES_METRICS.sections.SALES_SOURCE.items.PAY_METHOD,
);
export const isDailySalesTrendMetricCardCode =
  createMetricCardCodeBySectionItemGuard(
    SALES_METRICS.sections.SALES_TREND.items.DAILY_SALES_TREND,
  );
export const isWeeklySalesTrendMetricCardCode =
  createMetricCardCodeBySectionItemGuard(
    SALES_METRICS.sections.SALES_TREND.items.WEEKLY_SALES_TREND,
  );
export const isMonthlySalesTrendMetricCardCode =
  createMetricCardCodeBySectionItemGuard(
    SALES_METRICS.sections.SALES_TREND.items.MONTHLY_SALES_TREND,
  );
export const isPeakTimeMetricCardCode = createMetricCardCodeBySectionItemGuard(
  SALES_METRICS.sections.SALES_PATTERN.items.PEAK_TIME,
);
export const isWeekdaySalesPatternMetricCardCode =
  createMetricCardCodeBySectionItemGuard(
    SALES_METRICS.sections.SALES_PATTERN.items.WEEKDAY_SALES_PATTERN,
  );

/**
 * 메뉴분석 관련 카드 코드 타입 가드
 */
export const isMenuSalesRankingMetricCardCode =
  createMetricCardCodeBySectionItemGuard(
    MENU_METRICS.sections.POPULAR_MENU.items.MENU_SALES_RANKING,
  );
export const isTimeBasedMenuOrderCountMetricCardCode =
  createMetricCardCodeBySectionItemGuard(
    MENU_METRICS.sections.MENU_SALES_PATTERN.items.TIME_BASED_MENU_ORDER_COUNT,
  );
export const isIngredientConsumptionRankMetricCardCode =
  createMetricCardCodeBySectionItemGuard(
    MENU_METRICS.sections.INGREDIENT_CONSUMPTION_RANK.items
      .INGREDIENT_CONSUMPTION_RANK,
  );
export const isPopularMenuCombinationMetricCardCode =
  createMetricCardCodeBySectionItemGuard(
    MENU_METRICS.sections.POPULAR_MENU_COMBINATION.items
      .POPULAR_MENU_COMBINATION,
  );
