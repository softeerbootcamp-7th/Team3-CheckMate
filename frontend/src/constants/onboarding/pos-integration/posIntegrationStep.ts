import type { ValueOf } from '@/utils/shared';

export const POS_INTEGRATION_STEP = {
  STARTED: 'STARTED',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
} as const;

export type PosIntegrationStep = ValueOf<typeof POS_INTEGRATION_STEP>;
