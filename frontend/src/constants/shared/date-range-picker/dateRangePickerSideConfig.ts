import {
  formatDateYYYYMM,
  formatDateYYYYMMDD,
  getDateDifference,
  getMondayOfWeek,
} from '@/utils/shared';

import { DATE_RANGE_PICKER_TYPE } from './dateRangePickerType';

export const DATE_RANGE_SIDE_CONFIG = {
  [DATE_RANGE_PICKER_TYPE.date]: {
    alertText: '최대 30일까지 선택할 수 있어요.',
    validate: (startDate?: Date, endDate?: Date) => {
      if (!startDate || !endDate) {
        return true;
      }

      const dateDifference = getDateDifference({
        startDate,
        endDate,
      });

      return dateDifference <= 30;
    },
    formattedDate: formatDateYYYYMMDD,
  },
  [DATE_RANGE_PICKER_TYPE.week]: {
    alertText: '최대 12주까지 선택할 수 있어요.',
    validate: (startDate?: Date, endDate?: Date) => {
      if (!startDate || !endDate) {
        return true;
      }

      const mondayOfEndDate = getMondayOfWeek(endDate);
      const dateDifference = getDateDifference({
        startDate,
        endDate: mondayOfEndDate,
      });

      // 7 * 12 = 84
      return dateDifference <= 84;
    },
    formattedDate: formatDateYYYYMMDD,
  },
  [DATE_RANGE_PICKER_TYPE.month]: {
    alertText: '최대 12개월까지 선택할 수 있어요.',
    validate: (startDate?: Date, endDate?: Date) => {
      if (!startDate || !endDate) {
        return true;
      }

      const yearDifference = endDate.getFullYear() - startDate.getFullYear();
      const monthDifference = endDate.getMonth() - startDate.getMonth();

      return yearDifference * 12 + monthDifference + 1 <= 12;
    },
    formattedDate: formatDateYYYYMM,
  },
  [DATE_RANGE_PICKER_TYPE.year]: {
    alertText: '최대 3년까지 선택할 수 있어요.',
    validate: (startDate?: Date, endDate?: Date) => {
      if (!startDate || !endDate) {
        return true;
      }

      const yearDifference =
        endDate.getFullYear() - startDate.getFullYear() + 1;

      return yearDifference <= 3;
    },
    formattedDate: formatDateYYYYMM,
  },
} as const;
