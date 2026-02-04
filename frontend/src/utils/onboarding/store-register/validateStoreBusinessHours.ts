import { STORE_BUSINESS_WEEK_DAY_LIST } from '@/constants/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';

import { parseStoreBusinessHour } from './parseStoreBusinessHour';

const storeBusinessHoursValidator = {
  // 영업 시간 또는 상태를 선택하지 않은 경우
  EMPTY_BUSINESS_HOUR: {
    validate: (value: StoreRegisterForm['businessHours']) => {
      return value.findIndex(
        (businessHour) =>
          !businessHour.openTime &&
          !businessHour.closeTime &&
          !businessHour.is24 &&
          !businessHour.closed,
      );
    },
    message: (index: number) => {
      return `${STORE_BUSINESS_WEEK_DAY_LIST[index].label}요일의 영업 시간 또는 상태(24시/휴무)를 선택해 주세요.`;
    },
  },

  // 영업 마감 시간만 선택한 경우
  EMPTY_START_TIME: {
    validate: (value: StoreRegisterForm['businessHours']) => {
      return value.findIndex((businessHour) => {
        if (businessHour.is24 || businessHour.closed) {
          return false;
        }

        return !businessHour.openTime && businessHour.closeTime;
      });
    },
    message: (index: number) => {
      return `${STORE_BUSINESS_WEEK_DAY_LIST[index].label}요일의 영업 시작을 선택해 주세요.`;
    },
  },

  // 영업 시작 시간만 선택한 경우
  EMPTY_CLOSE_TIME: {
    validate: (value: StoreRegisterForm['businessHours']) => {
      return value.findIndex((businessHour) => {
        if (businessHour.is24 || businessHour.closed) {
          return false;
        }

        return businessHour.openTime && !businessHour.closeTime;
      });
    },
    message: (index: number) => {
      return `${STORE_BUSINESS_WEEK_DAY_LIST[index].label}요일의 영업 마감 시간을 선택해 주세요.`;
    },
  },

  // 영업 시작 시간과 마감 시간이 같거나 시작 시간이 마감 시간보다 늦은 경우
  INVALID_CLOSE_TIME: {
    validate: (value: StoreRegisterForm['businessHours']) => {
      return value.findIndex((businessHour) => {
        if (businessHour.is24 || businessHour.closed) {
          return false;
        }

        if (businessHour.openTime && businessHour.closeTime) {
          const { hour: openHour, minute: openMinute } = parseStoreBusinessHour(
            businessHour.openTime,
          );
          const { hour: closeHour, minute: closeMinute } =
            parseStoreBusinessHour(businessHour.closeTime);
          return openHour === closeHour && openMinute === closeMinute;
        }
        return false;
      });
    },
    message: (index: number) => {
      return `${STORE_BUSINESS_WEEK_DAY_LIST[index].label}요일의 마감 시간이 시작 시간과 겹칩니다.`;
    },
  },

  // 영업 마감 시간이 다음날 시작 시간보다 늦는 경우
  INVALID_CLOSE_TIME_TO_NEXT_DAY_START_TIME: {
    validate: (value: StoreRegisterForm['businessHours']) => {
      return value.findIndex((business, index) => {
        if (business.is24 || business.closed) {
          return false;
        }

        const closeTime = business.closeTime;
        const nextDayStartTime =
          value[(index + 1) % STORE_BUSINESS_WEEK_DAY_LIST.length]?.openTime;

        const { isOver24 } = value[index];

        if (closeTime && nextDayStartTime && isOver24) {
          const { hour: closeHour, minute: closeMinute } =
            parseStoreBusinessHour(closeTime);
          const { hour: nextDayStartTimeHour, minute: nextDayStartTimeMinute } =
            parseStoreBusinessHour(nextDayStartTime);

          return (
            closeHour > nextDayStartTimeHour ||
            (closeHour === nextDayStartTimeHour &&
              closeMinute >= nextDayStartTimeMinute)
          );
        }
        return false;
      });
    },
    message: (index: number) => {
      return `${STORE_BUSINESS_WEEK_DAY_LIST[index].label}요일의 마감 시간이 다음날 시작 시간과 겹칩니다.`;
    },
  },
};

export const validateStoreBusinessHours = (
  value: StoreRegisterForm['businessHours'],
) => {
  for (const validator of Object.values(storeBusinessHoursValidator)) {
    const index = validator.validate(value);
    if (index !== -1) {
      return validator.message(index);
    }
  }
  return true;
};
