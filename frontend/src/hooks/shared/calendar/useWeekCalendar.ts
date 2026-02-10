import { getMondayOfWeek, getSundayOfWeek } from '@/utils/shared/calendar';

interface UseWeekCalendarProps {
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  setSelectedStartDate: (date?: Date) => void;
  setSelectedEndDate: (date?: Date) => void;
}
export const useWeekCalendar = ({
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
}: UseWeekCalendarProps) => {
  const handleSelectWeek = (currentDate: Date) => {
    const mondayOfSelectedWeek = getMondayOfWeek(currentDate);
    const sundayOfSelectedWeek = getSundayOfWeek(currentDate);

    // 시작 날짜와 종료 날짜가 없을 때, 선택한 주의 월요일을 시작 날짜로 설정
    if (!selectedStartDate && !selectedEndDate) {
      setSelectedStartDate(mondayOfSelectedWeek);
      return;
    }

    // 시작 날짜가 있고 종료 날짜가 없을 때, 선택한 주의 일요일이 기존 시작 날짜보다 이후이면 종료 날짜로 설정
    if (selectedStartDate && !selectedEndDate) {
      if (mondayOfSelectedWeek.getTime() > selectedStartDate.getTime()) {
        setSelectedEndDate(sundayOfSelectedWeek);
        return;
      }

      // 이전이면 기존 시작 주의 일요일을 종료 날짜로 설정하고 새로운 시작 날짜를 선택한 주의 월요일로 설정
      const sundayOfSelectedStartDate = getSundayOfWeek(selectedStartDate);
      setSelectedStartDate(mondayOfSelectedWeek);
      setSelectedEndDate(sundayOfSelectedStartDate);
      return;
    }

    // 시작 날짜와 종료 날짜가 있을 때
    if (selectedStartDate && selectedEndDate && sundayOfSelectedWeek) {
      // 선택한 주의 일요일이 기존 종료 날짜보다 이후이면 종료 날짜로 설정
      if (sundayOfSelectedWeek.getTime() > selectedEndDate.getTime()) {
        setSelectedEndDate(sundayOfSelectedWeek);
        return;
      }

      // 선택한 주의 월요일이 기존 시작 날짜보다 이전이면 시작 날짜를 설정하고 기존 시작 주의 일요일을 종료 날짜를 설정
      if (mondayOfSelectedWeek.getTime() < selectedStartDate.getTime()) {
        setSelectedStartDate(mondayOfSelectedWeek);
        return;
      }

      // 선택한 주의 월요일이 기존 시작 날짜와 동일하면 종료 날짜를 설정
      if (mondayOfSelectedWeek.getTime() === selectedStartDate.getTime()) {
        setSelectedEndDate(sundayOfSelectedWeek);
        return;
      }

      // 선택한 날짜가 시작 날짜와 종료 날짜 사이에 있으면 종료 날짜를 설정
      if (
        mondayOfSelectedWeek.getTime() > selectedStartDate.getTime() &&
        sundayOfSelectedWeek.getTime() < selectedEndDate.getTime()
      ) {
        setSelectedEndDate(sundayOfSelectedWeek);
        return;
      }
    }
  };

  return {
    handleSelectWeek,
  };
};
