import type { DeepValueOf } from '@/utils/shared';

export const SALES_SOURCE = {
  SALE_TYPE: {
    // 홀, 배달, 포장
    DINE_IN: '홀',
    DELIVERY: '배달',
    TAKEOUT: '포장',
  },
  ORDER_METHOD: {
    POS: 'POS',
    KIOSK: '키오스크',
    DELIVERY_APP: '배달앱',
  },
  PAYMENT_METHOD: {
    CARD: '카드',
    CASH: '현금',
    MOBILE: '간편결제',
    ETC: '기타',
  },
} as const;

export type SalesSourceType = DeepValueOf<typeof SALES_SOURCE>;

export const SALES_SOURCE_COLORS = {
  [SALES_SOURCE.SALE_TYPE.DINE_IN]: 'var(--color-brand-500)',
  [SALES_SOURCE.SALE_TYPE.DELIVERY]: 'var(--color-grey-500)',
  [SALES_SOURCE.SALE_TYPE.TAKEOUT]: 'var(--color-brand-50)',
  [SALES_SOURCE.ORDER_METHOD.POS]: 'var(--color-brand-500)',
  [SALES_SOURCE.ORDER_METHOD.KIOSK]: 'var(--color-grey-500)',
  [SALES_SOURCE.ORDER_METHOD.DELIVERY_APP]: 'var(--color-brand-50)',
  [SALES_SOURCE.PAYMENT_METHOD.CARD]: 'var(--color-brand-500)',
  [SALES_SOURCE.PAYMENT_METHOD.CASH]: 'var(--color-grey-500)',
  [SALES_SOURCE.PAYMENT_METHOD.MOBILE]: 'var(--color-brand-200)',
  [SALES_SOURCE.PAYMENT_METHOD.ETC]: 'var(--color-brand-50)',
};

const SALES_SOURCE_TYPES: readonly string[] = [
  ...Object.values(SALES_SOURCE.SALE_TYPE),
  ...Object.values(SALES_SOURCE.ORDER_METHOD),
  ...Object.values(SALES_SOURCE.PAYMENT_METHOD),
];

export const isSalesSourceType = (value: string): value is SalesSourceType => {
  return SALES_SOURCE_TYPES.includes(value);
};
