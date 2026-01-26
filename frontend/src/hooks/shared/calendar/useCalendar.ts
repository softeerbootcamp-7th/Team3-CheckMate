import { useCallback, useMemo, useState } from 'react';

import {
  getFirstDayOfMonth,
  getLastDayOfMonth,
  getNumberOfDate,
} from '@/utils/shared';

interface UseCalendarProps {
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  setSelectedStartDate: (date?: Date) => void;
  setSelectedEndDate: (date?: Date) => void;
}
export const useCalendar = ({
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
}: UseCalendarProps) => {
  /**
   * @description 현재 달력의 날짜를 상태로 관리 (기본 값: 종료 날짜, 없으면 현재 날짜)
   */
  const [currentDateForCalendar, setCurrentDateForCalendar] = useState<Date>(
    selectedEndDate ?? new Date(),
  );

  /**
   * @description 현재 달력의 년도를 반환
   */
  const currentYearForCalendar = useMemo(() => {
    return currentDateForCalendar.getFullYear();
  }, [currentDateForCalendar]);

  /**
   * @description 현재 달력의 월을 반환
   */
  const currentMonthForCalendar = useMemo(() => {
    return currentDateForCalendar.getMonth() + 1;
  }, [currentDateForCalendar]);

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
   * @description 이전 달로 이동하는 함수
   */
  const handleClickPreviousMonth = useCallback(() => {
    const currentMonth = currentDateForCalendar.getMonth();
    setCurrentDateForCalendar(
      new Date(currentDateForCalendar.getFullYear(), currentMonth - 1),
    );
  }, [currentDateForCalendar]);

  /**
   * @description 다음 달로 이동하는 함수
   */
  const handleClickNextMonth = useCallback(() => {
    const currentMonth = currentDateForCalendar.getMonth();
    setCurrentDateForCalendar(
      new Date(currentDateForCalendar.getFullYear(), currentMonth + 1),
    );
  }, [currentDateForCalendar]);

  const handleSelectDate = ({
    date,
    isPreviousMonth = false,
    isNextMonth = false,
  }: {
    date: number;
    isPreviousMonth: boolean;
    isNextMonth: boolean;
  }) => {
    const selectedDate = new Date(
      currentYearForCalendar,
      currentMonthForCalendar -
        1 +
        (isPreviousMonth ? -1 : 0) +
        (isNextMonth ? 1 : 0),
      date,
    );

    // 시작 날짜와 종료 날짜가 없을 때, 선택한 날짜를 시작 날짜로 설정
    if (!selectedStartDate && !selectedEndDate) {
      setSelectedStartDate(selectedDate);
      return;
    }

    // 시작 날짜가 있고 종료 날짜가 없을 때, 선택한 날짜가 시작 날짜보다 크면 종료 날짜로 설정
    // 작으면 시작 날짜를 종료 날짜를 설정하고 시작 날짜를 선택한 날짜로 설정
    if (selectedStartDate && !selectedEndDate) {
      const currentSelectedStartDate = new Date(selectedStartDate);
      if (selectedDate.getTime() > selectedStartDate.getTime()) {
        setSelectedEndDate(selectedDate);
        return;
      }

      setSelectedStartDate(selectedDate);
      setSelectedEndDate(currentSelectedStartDate);
      return;
    }

    // 시작 날짜와 종료 날짜가 있을 때
    if (selectedStartDate && selectedEndDate) {
      const currentSelectedStartDate = new Date(selectedStartDate);
      const currentSelectedEndDate = new Date(selectedEndDate);
      // 선택한 날짜가 종료 날짜보다 크거나 같으면 종료 날짜로 설정
      if (selectedDate.getTime() > currentSelectedEndDate.getTime()) {
        setSelectedEndDate(selectedDate);
        return;
      }

      // 선택한 날짜가 시작 날짜보다 작으면 시작 날짜를 설정하고 종료 날짜를 설정
      if (selectedDate.getTime() <= currentSelectedStartDate.getTime()) {
        setSelectedStartDate(selectedDate);
        setSelectedEndDate(currentSelectedStartDate);
      }

      // 선택한 날짜가 시작 날짜와 종료 날짜 사이에 있으면 종료 날짜를 설정
      if (
        selectedDate.getTime() > currentSelectedStartDate.getTime() &&
        selectedDate.getTime() < currentSelectedEndDate.getTime()
      ) {
        setSelectedEndDate(selectedDate);
        return;
      }
    }
  };

  return {
    currentDateForCalendar,
    currentYearForCalendar,
    currentMonthForCalendar,
    numberOfDatesForCalendar,
    lastWeekOfPreviousMonth,
    firstWeekOfNextMonth,
    handleClickPreviousMonth,
    handleClickNextMonth,
    handleSelectDate,
  };
};
