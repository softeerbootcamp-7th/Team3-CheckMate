interface UseDateCalendarProps {
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  setSelectedStartDate: (date?: Date) => void;
  setSelectedEndDate: (date?: Date) => void;
}
export const useDateCalendar = ({
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
}: UseDateCalendarProps) => {
  const handleSelectDate = (currentDate: Date) => {
    // 시작 날짜와 종료 날짜가 없을 때, 선택한 날짜를 시작 날짜로 설정
    if (!selectedStartDate && !selectedEndDate) {
      setSelectedStartDate(currentDate);
      return;
    }

    // 시작 날짜가 있고 종료 날짜가 없을 때, 선택한 날짜가 시작 날짜보다 이후이면 종료 날짜로 설정
    // 이전이면 시작 날짜를 종료 날짜를 설정하고 시작 날짜를 선택한 날짜로 설정
    if (selectedStartDate && !selectedEndDate) {
      const currentSelectedStartDate = new Date(selectedStartDate);
      if (currentDate.getTime() > selectedStartDate.getTime()) {
        setSelectedEndDate(currentDate);
        return;
      }

      setSelectedStartDate(currentDate);
      setSelectedEndDate(currentSelectedStartDate);
      return;
    }

    // 시작 날짜와 종료 날짜가 있을 때
    if (selectedStartDate && selectedEndDate) {
      const currentSelectedStartDate = new Date(selectedStartDate);
      const currentSelectedEndDate = new Date(selectedEndDate);
      // 선택한 날짜가 종료 날짜보다 이후이면 종료 날짜로 설정
      if (currentDate.getTime() > currentSelectedEndDate.getTime()) {
        setSelectedEndDate(currentDate);
        return;
      }

      // 선택한 날짜가 시작 날짜보다 이전이면 시작 날짜를 설정하고 종료 날짜를 설정
      if (currentDate.getTime() < currentSelectedStartDate.getTime()) {
        setSelectedStartDate(currentDate);
        return;
      }

      // 선택한 날짜가 시작 날짜와 동일하면 종료 날짜를 설정
      if (currentDate.getTime() === currentSelectedStartDate.getTime()) {
        setSelectedEndDate(currentDate);
        return;
      }

      // 선택한 날짜가 시작 날짜와 종료 날짜 사이에 있으면 종료 날짜를 설정
      if (
        currentDate.getTime() > currentSelectedStartDate.getTime() &&
        currentDate.getTime() < currentSelectedEndDate.getTime()
      ) {
        setSelectedEndDate(currentDate);
        return;
      }
    }
  };

  return {
    handleSelectDate,
  };
};
