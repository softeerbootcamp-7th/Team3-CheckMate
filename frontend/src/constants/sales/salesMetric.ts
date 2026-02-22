export const SALES_METRIC = {
  CURRENT_SALES: {
    REAL_SALES: {
      label: '실매출',
      cardCodes: {
        today: 'SLS_01_01',
        thisWeek: 'SLS_01_02',
        thisMonth: 'SLS_01_03',
      },
    },
    ORDER_COUNT: {
      label: '주문건수',
      cardCodes: {
        today: 'SLS_02_01',
        thisWeek: 'SLS_02_02',
        thisMonth: 'SLS_02_03',
      },
    },
    AVERAGE_PRICE: {
      label: '건당 평균가',
      cardCodes: {
        today: 'SLS_03_01',
        thisWeek: 'SLS_03_02',
        thisMonth: 'SLS_03_03',
      },
    },
    TOTAL_SALES: {
      label: '총 매출',
      cardCodes: {
        today: 'SLS_04_01',
        thisWeek: 'SLS_04_02',
        thisMonth: 'SLS_04_03',
      },
    },
    DISCOUNT_AND_CANCELLATION: {
      label: '할인 및 취소',
      cardCodes: {
        today: 'SLS_05_01',
        thisWeek: 'SLS_05_02',
        thisMonth: 'SLS_05_03',
      },
    },
  },
  SALES_SOURCE: {
    SALES_TYPE: {
      label: '판매유형별 매출',
      cardCodes: {
        today: 'SLS_06_01',
        thisWeek: 'SLS_06_02',
        thisMonth: 'SLS_06_03',
      },
    },
    ORDER_CHANNEL: {
      label: '주문수단별 매출',
      cardCodes: {
        today: 'SLS_07_01',
        thisWeek: 'SLS_07_02',
        thisMonth: 'SLS_07_03',
      },
    },
    PAY_METHOD: {
      label: '결제수단별 매출',
      cardCodes: {
        today: 'SLS_08_01',
        thisWeek: 'SLS_08_02',
        thisMonth: 'SLS_08_03',
      },
    },
  },
  SALES_TREND: {
    DAILY_SALES_TREND: {
      label: '일별 매출 추이',
      cardCodes: {
        recent7Days: 'SLS_09_04',
        recent14Days: 'SLS_09_05',
        recent30Days: 'SLS_09_06',
      },
    },
    WEEKLY_SALES_TREND: {
      label: '주별 매출 추이',
      cardCodes: {
        recent8Weeks: 'SLS_10_07',
        recent12Weeks: 'SLS_10_08',
      },
    },
    MONTHLY_SALES_TREND: {
      label: '월별 매출 추이',
      cardCodes: {
        recent6Months: 'SLS_11_07',
        recent12Months: 'SLS_11_08',
      },
    },
    YEARLY_SALES_TREND: {
      label: '연별 매출 추이',
      cardCodes: {
        recent3Years: 'SLS_12_01',
      },
    },
  },
  SALES_PATTERN: {
    PEAK_TIME: {
      label: '피크 타임 (시간대별 주문건수)',
      cardCodes: {
        today: 'SLS_13_01',
      },
    },
    WEEKDAY_SALES_PATTERN: {
      label: '요일별 매출(일평균)',
      cardCodes: {
        recent4Weeks: 'SLS_14_06',
      },
    },
  },
} as const;

type ExtractSalesMetricCardCodes<T> = T extends {
  cardCodes: infer C;
}
  ? C extends Record<string, string>
    ? C[keyof C]
    : never
  : T extends Record<string, unknown>
    ? ExtractSalesMetricCardCodes<T[keyof T]>
    : never;

export type SalesMetricCardCodes = ExtractSalesMetricCardCodes<
  typeof SALES_METRIC
>;

const SALES_METRIC_CARD_CODES_SET = new Set<string>(
  Object.values(SALES_METRIC).flatMap((item) =>
    Object.values(item).flatMap((i) => Object.values(i.cardCodes)),
  ),
);

export const isSalesMetricCardCodes = (
  value: unknown,
): value is SalesMetricCardCodes => {
  return typeof value === 'string' && SALES_METRIC_CARD_CODES_SET.has(value);
};
