import type { BusinessHourRequest } from '@/types/shared';

export interface StoreInfo {
  storeName: string;
  businessHourRequests: BusinessHourRequest[];
  salesClosingHour: number; // 매출 마감 시간
}
