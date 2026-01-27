/**
 * @description 인자로 주어진 date의 총 날짜 수를 반환
 * @param date
 * @returns
 */
export const getNumberOfDate = (date: Date) => {
  const year = date.getFullYear();
  const nextMonth = date.getMonth() + 1;

  return new Date(year, nextMonth, 0).getDate();
};

/**
 * @description 인자로 주어진 date의 월의 첫 번째 날짜의 요일을 반환
 * @param date
 * @returns
 */
export const getFirstDayOfMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  return new Date(year, month, 1).getDay();
};

/**
 * @description 인자로 주어진 date의 월의 마지막 날짜의 요일을 반환
 * @param date
 * @returns
 */
export const getLastDayOfMonth = (date: Date) => {
  const year = date.getFullYear();
  const nextMonth = date.getMonth() + 1;

  return new Date(year, nextMonth, 0).getDay();
};

export const isStartDate = ({
  currentDate,
  selectedStartDate,
}: {
  currentDate: Date;
  selectedStartDate?: Date;
}) => {
  return currentDate.getTime() === selectedStartDate?.getTime();
};

export const isEndDate = ({
  currentDate,
  selectedEndDate,
}: {
  currentDate: Date;
  selectedEndDate?: Date;
}) => {
  return currentDate.getTime() === selectedEndDate?.getTime();
};

export const isBetweenSelectedDate = ({
  currentDate,
  selectedStartDate,
  selectedEndDate,
}: {
  currentDate: Date;
  selectedStartDate?: Date;
  selectedEndDate?: Date;
}) => {
  if (!selectedStartDate || !selectedEndDate) {
    return false;
  }
  return (
    currentDate.getTime() > selectedStartDate.getTime() &&
    currentDate.getTime() < selectedEndDate.getTime()
  );
};

export const getCurrentDate = ({
  date,
  dateForCalendar,
  isPreviousMonth,
  isNextMonth,
}: {
  date: number;
  dateForCalendar: Date;
  isPreviousMonth: boolean;
  isNextMonth: boolean;
}) => {
  return new Date(
    dateForCalendar.getFullYear(),
    dateForCalendar.getMonth() +
      (isPreviousMonth ? -1 : 0) +
      (isNextMonth ? 1 : 0),
    date,
  );
};

export const getMondayOfWeek = (currentDate: Date) => {
  const dayOfCurrentDate =
    currentDate.getDay() === 0 ? 7 : currentDate.getDay();

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - dayOfCurrentDate + 1,
  );
};

export const getSundayOfWeek = (currentDate?: Date) => {
  if (!currentDate) {
    return undefined;
  }
  const dayOfCurrentDate =
    currentDate.getDay() === 0 ? 7 : currentDate.getDay();

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() + 7 - dayOfCurrentDate,
  );
};

export const getCurrentMonth = ({
  month,
  dateForCalendar,
}: {
  month: number;
  dateForCalendar: Date;
}) => {
  return new Date(dateForCalendar.getFullYear(), month, 1);
};
