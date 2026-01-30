import type { ValueOf } from '@/utils/shared';

export const POS_INTEGRATION_STEP = {
  GUIDE: 'guide',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;

export type PosIntegrationStep = ValueOf<typeof POS_INTEGRATION_STEP>;
