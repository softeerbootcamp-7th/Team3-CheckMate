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

/**
 * @description 인자로 주어진 currentDate가 시작 날짜와 동일한지 여부를 반환
 * @param currentDate
 * @param selectedStartDate
 * @returns
 */
export const isStartDate = ({
  currentDate,
  selectedStartDate,
}: {
  currentDate: Date;
  selectedStartDate?: Date;
}) => {
  return currentDate.getTime() === selectedStartDate?.getTime();
};

/**
 * @description 인자로 주어진 currentDate가 종료 날짜와 동일한지 여부를 반환
 * @param currentDate
 * @param selectedEndDate
 * @returns
 */
export const isEndDate = ({
  currentDate,
  selectedEndDate,
}: {
  currentDate: Date;
  selectedEndDate?: Date;
}) => {
  return currentDate.getTime() === selectedEndDate?.getTime();
};

/**
 *
 * @description 인자로 주어진 currentDate가 시작 날짜와 종료 날짜 사이에 있는지 여부를 반환
 * @param currentDate
 * @param selectedStartDate
 * @param selectedEndDate
 * @returns
 */
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

/**
 * @description 인자로 주어진 dateForCalendar의 월을 기준으로 인자로 주어진 date의 날짜를 반환
 * @param date
 * @param dateForCalendar
 * @param isPreviousMonth
 * @param isNextMonth
 * @returns
 */
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

/**
 * @description 인자로 주어진 currentDate가 속한 주의 월요일을 반환
 * @param currentDate
 * @returns
 */
export const getMondayOfWeek = (currentDate: Date) => {
  const dayOfCurrentDate =
    currentDate.getDay() === 0 ? 7 : currentDate.getDay();

  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - dayOfCurrentDate + 1,
  );
};

/**
 * @description 인자로 주어진 currentDate가 속한 주의 일요일을 반환
 * @param currentDate
 * @returns
 */
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

/**
 * @description 인자로 주어진 month와 dateForCalendar의 월을 반환
 * @param month
 * @param dateForCalendar
 * @returns
 */
export const getCurrentMonth = ({
  month,
  dateForCalendar,
}: {
  month: number;
  dateForCalendar: Date;
}) => {
  return new Date(dateForCalendar.getFullYear(), month, 1);
};

export const getDateDifference = ({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) => {
  return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
};

export const getCurrentYear = ({ year }: { year: number }) => {
  return new Date(year, 0, 1);
};

/**
 * @description 인자로 주어진 date의 월의 마지막 날짜를 반환
 * @param date
 */
export const getLastDateOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 *
 * @description 인자로 주어진 date의 월이 인자로 주어진 compareDate의 월과 동일한지 여부를 반환
 * @param date
 * @param compareDate
 * @returns
 */
export const isSameMonth = ({
  date,
  compareDate,
}: {
  date: Date;
  compareDate?: Date;
}) => {
  return (
    date.getFullYear() === compareDate?.getFullYear() &&
    date.getMonth() === compareDate?.getMonth()
  );
};

/**
 * @description 인자로 주어진 date의 연도의 마지막 날짜를 반환
 * @param date
 * @returns
 */
export const getLastDateOfYear = (date: Date) => {
  return new Date(date.getFullYear() + 1, 0, 0);
};

/**
 * @description 인자로 주어진 date의 연도가 인자로 주어진 compareDate의 연도와 동일한지 여부를 반환
 * @param date
 * @param compareDate
 * @returns
 */
export const isSameYear = ({
  date,
  compareDate,
}: {
  date: Date;
  compareDate?: Date;
}) => {
  return date.getFullYear() === compareDate?.getFullYear();
};
