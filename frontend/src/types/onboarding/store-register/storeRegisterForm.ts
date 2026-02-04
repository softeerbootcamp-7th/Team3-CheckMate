type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

interface BusinessHour {
  dayOfWeek: DayOfWeek;
  openTime?: string; // 00:00 ~ 24:00
  closeTime?: string; // 00:00 ~ 24:00
  is24?: boolean;
  closed?: boolean;
  // client에만 있는 상태, 마감 시간이 다음날 00:00 이후인 경우 체크
  isOver24: boolean;
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
