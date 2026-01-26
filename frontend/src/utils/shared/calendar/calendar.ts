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
  const nextMonth = date.getMonth();

  return new Date(year, nextMonth + 1, 0).getDay();
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
