import type { BusinessHour, StoreInfo } from '@/types/shared';

export type GetSettingMyStoreInfoResponseDto = Omit<
  StoreInfo,
  'businessHourRequests'
> & {
  businessHourResponses: BusinessHour[];
};
