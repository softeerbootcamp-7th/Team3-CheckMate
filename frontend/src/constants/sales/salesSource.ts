import type { DeepValueOf } from '@/utils/shared';

export const SALES_SOURCE = {
  SALES_TYPE: {
    // 홀, 배달, 포장
    DINE_IN: '홀',
    DELIVERY: '배달',
    TAKE_OUT: '포장',
  },
  ORDER_CHANNEL: {
    POS: 'POS',
    KIOSK: '키오스크',
    DELIVERY_APP: '배달앱',
  },
  PAY_METHOD: {
    CARD: '카드',
    CASH: '현금',
    EASY_PAY: '간편결제',
    ETC: '기타',
  },
} as const;

export type SalesSourceType<T extends keyof typeof SALES_SOURCE> =
  keyof (typeof SALES_SOURCE)[T];

export const SALES_SOURCE_COLORS = {
  [SALES_SOURCE.SALES_TYPE.DINE_IN]: 'var(--color-brand-500)',
  [SALES_SOURCE.SALES_TYPE.DELIVERY]: 'var(--color-grey-500)',
  [SALES_SOURCE.SALES_TYPE.TAKE_OUT]: 'var(--color-brand-50)',
  [SALES_SOURCE.ORDER_CHANNEL.POS]: 'var(--color-brand-500)',
  [SALES_SOURCE.ORDER_CHANNEL.KIOSK]: 'var(--color-grey-500)',
  [SALES_SOURCE.ORDER_CHANNEL.DELIVERY_APP]: 'var(--color-brand-200)',
  [SALES_SOURCE.PAY_METHOD.CARD]: 'var(--color-brand-500)',
  [SALES_SOURCE.PAY_METHOD.CASH]: 'var(--color-grey-500)',
  [SALES_SOURCE.PAY_METHOD.EASY_PAY]: 'var(--color-brand-200)',
  [SALES_SOURCE.PAY_METHOD.ETC]: 'var(--color-brand-50)',
};

const SALES_SOURCE_TYPES: readonly string[] = [
  ...Object.values(SALES_SOURCE.SALES_TYPE),
  ...Object.values(SALES_SOURCE.ORDER_CHANNEL),
  ...Object.values(SALES_SOURCE.PAY_METHOD),
];

type SalesSourceValues = DeepValueOf<typeof SALES_SOURCE>;
export const isSalesSourceType = (
  value: string,
): value is SalesSourceValues => {
  return SALES_SOURCE_TYPES.includes(value);
};
