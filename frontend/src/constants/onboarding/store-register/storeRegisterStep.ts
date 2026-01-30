import type { ValueOf } from '@/utils/shared';

export const STORE_REGISTER_STEP = {
  BUSINESS_REGISTRATION_NUMBER: 1,
  STORE_INFORMATION: 2,
  STORE_BUSINESS_HOURS: 3,
  SALES_CLOSING_TIME: 4,
} as const;

export type StoreRegisterStep = ValueOf<typeof STORE_REGISTER_STEP>;
