type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

interface BusinessHour {
  dayOfWeek: DayOfWeek;
  openTime: string; // 00:00 ~ 24:00
  closeTime: string; // 00:00 ~ 24:00
  closed: boolean;
}

export interface StoreRegisterForm {
  businessRegistrationNumber: string;
  businessAuthToken: string;
  storeName: string;
  zoneCode: string; // 우편번호
  roadAddress: string; // 도로명 주소
  businessHours: BusinessHour[];
  salesClosingHour: number; // 매출 마감 시간
}
