interface UseMonthCalendarProps {
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  setSelectedStartDate: (date?: Date) => void;
  setSelectedEndDate: (date?: Date) => void;
}
export const useMonthCalendar = ({
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
}: UseMonthCalendarProps) => {
  const handleSelectMonth = (currentDate: Date) => {
    const newDate = new Date(currentDate);
    // 시작 날짜와 종료 날짜가 없을 때, 선택한 월을 시작 날짜로 설정
    if (!selectedStartDate && !selectedEndDate) {
      setSelectedStartDate(newDate);
      return;
    }

    // 시작 날짜가 있고 종료 날짜가 없을 때, 선택한 주의 일요일이 기존 시작 날짜보다 이후이면 종료 날짜로 설정
    if (selectedStartDate && !selectedEndDate) {
      if (newDate.getTime() > selectedStartDate.getTime()) {
        setSelectedEndDate(newDate);
        return;
      }

      // 이전이면 기존 시작 월을 종료 날짜로 설정하고 새로운 시작 월을 설정
      setSelectedStartDate(newDate);
      setSelectedEndDate(new Date(selectedStartDate));
      return;
    }

    // 시작 날짜와 종료 날짜가 있을 때
    if (selectedStartDate && selectedEndDate) {
      // 선택한 주의 일요일이 기존 종료 날짜보다 이후이면 종료 날짜로 설정
      if (newDate.getTime() > selectedEndDate.getTime()) {
        setSelectedEndDate(newDate);
        return;
      }

      // 선택한 날짜가 기존 시작 날짜보다 이전이면 시작 날짜 갱신
      if (newDate.getTime() < selectedStartDate.getTime()) {
        setSelectedStartDate(newDate);
        return;
      }

      // 선택한 날짜가 기존 시작 날짜와 동일하면 종료 날짜 갱신
      if (newDate.getTime() === selectedStartDate.getTime()) {
        setSelectedEndDate(newDate);
        return;
      }

      // 선택한 날짜가 시작 날짜와 종료 날짜 사이에 있으면 종료 날짜를 설정
      if (
        newDate.getTime() > selectedStartDate.getTime() &&
        newDate.getTime() < selectedEndDate.getTime()
      ) {
        setSelectedEndDate(newDate);
        return;
      }
    }
  };

  return {
    handleSelectMonth,
  };
};
