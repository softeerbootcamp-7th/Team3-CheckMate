import type { BusinessHour } from '@/types/shared';

export interface StoreInfo {
  storeName: string;
  businessHourRequests: BusinessHour[];
  salesClosingHour: number; // 매출 마감 시간
}
