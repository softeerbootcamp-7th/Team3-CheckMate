import { useCallback, useMemo, useState } from 'react';

import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getNumberOfDate,
} from '@/utils/shared';

interface UseCalendarNavigationProps {
  selectedEndDate?: Date;
}

export const useCalendarNavigation = ({
  selectedEndDate,
}: UseCalendarNavigationProps) => {
  /**
   * @description 현재 달력의 날짜를 상태로 관리 (기본 값: 종료 날짜, 없으면 현재 날짜)
   */
  const [currentDateForCalendar, setCurrentDateForCalendar] = useState<Date>(
    selectedEndDate ?? new Date(),
  );

  /**
   * @description 현재 달력의 날짜 수를 반환
   */
  const numberOfDatesForCalendar = useMemo(() => {
    return getNumberOfDate(currentDateForCalendar);
  }, [currentDateForCalendar]);

  /**
   * @description 이전 달의 마지막 주의 날짜 배열을 반환 (달력 시작 요일에 따라 다름)
   */
  const lastWeekOfPreviousMonth = useMemo(() => {
    const firstDayOfMonth = getFirstDayOfMonth(currentDateForCalendar);

    const previousMonth = new Date(
      currentDateForCalendar.getFullYear(),
      currentDateForCalendar.getMonth() - 1,
    );

    const lastDateOfPreviousMonth = getNumberOfDate(previousMonth);
    return Array.from({
      length: (firstDayOfMonth === 0 ? 7 : firstDayOfMonth) - 1,
    })
      .map((_, index) => {
        return lastDateOfPreviousMonth - index;
      })
      .reverse();
  }, [currentDateForCalendar]);

  /**
   * @description 다음 달의 첫 번째 주의 날짜 배열을 반환 (달력 끝 요일에 따라 다름)
   */
  const firstWeekOfNextMonth = useMemo(() => {
    const lastDayOfMonth = getLastDayOfMonth(currentDateForCalendar);
    return Array.from({
      length: 7 - (lastDayOfMonth === 0 ? 7 : lastDayOfMonth),
    }).map((_, index) => {
      return index + 1;
    });
  }, [currentDateForCalendar]);

  /**
   * @description 달력의 달을 이전 달로 이동하는 함수
   */
  const handleMovePreviousMonth = useCallback(() => {
    setCurrentDateForCalendar(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1),
    );
  }, []);

  /**
   * @description 달력의 달을 다음 달로 이동하는 함수
   */
  const handleMoveNextMonth = useCallback(() => {
    setCurrentDateForCalendar(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1),
    );
  }, []);

  const handleMovePreviousYear = useCallback(() => {
    setCurrentDateForCalendar((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(newDate.getFullYear() - 1);
      return newDate;
    });
  }, []);

  const handleMoveNextYear = useCallback(() => {
    setCurrentDateForCalendar((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(newDate.getFullYear() + 1);
      return newDate;
    });
  }, []);

  const handleMovePrevious10Years = useCallback(() => {
    setCurrentDateForCalendar((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(newDate.getFullYear() - 10);
      return newDate;
    });
  }, []);

  const handleMoveNext10Years = useCallback(() => {
    setCurrentDateForCalendar((prev) => {
      const newDate = new Date(prev);
      newDate.setFullYear(newDate.getFullYear() + 10);
      return newDate;
    });
  }, []);

  return {
    currentDateForCalendar,
    setCurrentDateForCalendar,
    numberOfDatesForCalendar,
    lastWeekOfPreviousMonth,
    firstWeekOfNextMonth,
    handleMovePreviousMonth,
    handleMoveNextMonth,
    handleMovePreviousYear,
    handleMoveNextYear,
    handleMovePrevious10Years,
    handleMoveNext10Years,
  };
};
