export const MENU_METRIC = {
  POPULAR_MENU: {
    MENU_SALES_RANKING: {
      label: '메뉴별 매출 랭킹',
      cardCodes: {
        today: 'MNU_01_01',
        recent7Days: 'MNU_01_04',
        recent30Days: 'MNU_01_05',
      },
    },
    CATEGORY_SALES: {
      label: '카테고리별 매출 랭킹',
      cardCodes: {
        today: 'MNU_02_01',
        recent7Days: 'MNU_02_02',
        recent30Days: 'MNU_02_03',
      },
    },
  },
  MENU_SALES_PATTERN: {
    TIME_BASED_MENU_ORDER_COUNT: {
      label: '시간대별 메뉴 주문건수',
      cardCodes: {
        today: 'MNU_03_01',
        recent7Days: 'MNU_03_02',
        recent30Days: 'MNU_03_03',
      },
    },
  },
  INGREDIENT_CONSUMPTION: {
    INGREDIENT_CONSUMPTION_RANK: {
      label: '식재료 소진량',
      cardCodes: {
        today: 'MNU_04_01',
      },
    },
  },
  POPULAR_MENU_COMBINATION: {
    POPULAR_MENU_COMBINATION: {
      label: '인기 메뉴 조합',
      cardCodes: {
        recent7Days: 'MNU_05_04',
        recent14Days: 'MNU_05_05',
      },
    },
  },
} as const;

type ExtractMenuMetricCardCodes<T> = T extends {
  cardCodes: infer C;
}
  ? C extends Record<string, string>
    ? C[keyof C]
    : never
  : T extends Record<string, unknown>
    ? ExtractMenuMetricCardCodes<T[keyof T]>
    : never;

export type MenuMetricCardCodes = ExtractMenuMetricCardCodes<
  typeof MENU_METRIC
>;

const MENU_METRIC_CARD_CODES_SET = new Set<string>(
  Object.values(MENU_METRIC).flatMap((item) =>
    Object.values(item).flatMap((i) => Object.values(i.cardCodes)),
  ),
);

export const isMenuMetricCardCodes = (
  value: unknown,
): value is MenuMetricCardCodes => {
  return MENU_METRIC_CARD_CODES_SET.has(value as string);
};
