import type { BusinessHour } from '@/types/shared';

export interface GetSettingMyStoreInfoResponseDto {
  storeName: string;
  salesClosingTime: number;
  businessHours: BusinessHour[];
}
