import { DATE_RANGE_PICKER_TYPE } from '../date-range-picker';

export const CALENDAR_CONFIG = {
  [DATE_RANGE_PICKER_TYPE.date]: {
    headerTitle: (currentDateForCalendar: Date) =>
      `${currentDateForCalendar.getFullYear()}년 ${currentDateForCalendar.getMonth() + 1}월`,
    previousAriaLabel: '이전 달로 이동',
    nextAriaLabel: '다음 달로 이동',
  },
  [DATE_RANGE_PICKER_TYPE.week]: {
    headerTitle: (currentDateForCalendar: Date) =>
      `${currentDateForCalendar.getFullYear()}년 ${currentDateForCalendar.getMonth() + 1}월`,
    previousAriaLabel: '이전 달로 이동',
    nextAriaLabel: '다음 달로 이동',
  },
  [DATE_RANGE_PICKER_TYPE.month]: {
    headerTitle: (currentDateForCalendar: Date) =>
      `${currentDateForCalendar.getFullYear()}`,
    previousAriaLabel: '이전 년도로 이동',
    nextAriaLabel: '다음 년도로 이동',
  },
  [DATE_RANGE_PICKER_TYPE.year]: {
    headerTitle: (currentDateForCalendar: Date) =>
      `${currentDateForCalendar.getFullYear()} - ${currentDateForCalendar.getFullYear() + 9}`,
    previousAriaLabel: '10년 이전으로 이동',
    nextAriaLabel: '10년 이후로 이동',
  },
};
