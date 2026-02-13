import type { StoreRegisterForm } from '@/types/onboarding/store-register';

import { STORE_BUSINESS_WEEK_DAY_LIST } from './storeBusinessWeekDayList';

export const STORE_REGISTER_FORM_DEFAULT_VALUE: StoreRegisterForm = {
  businessHourRequests: STORE_BUSINESS_WEEK_DAY_LIST.map(({ id }) => ({
    dayOfWeek: id,
    openTime: '',
    closeTime: '',
    closed: undefined,
    is24: undefined,
    isOver24: false,
  })),
  salesClosingHour: 0,
  roadAddress: '',
  zoneCode: '',
  storeName: '',
  businessRegistrationNumber: '',
  businessAuthToken: '',
};
