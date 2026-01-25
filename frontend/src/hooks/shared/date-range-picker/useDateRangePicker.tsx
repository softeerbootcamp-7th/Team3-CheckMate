import { useCallback, useMemo, useState } from 'react';

import { Calendar } from '@/components/shared';
import {
  DATE_RANGE_PICKER_TYPE,
  type DateRangePickerType,
} from '@/constants/shared';

interface useDateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  setStartDate?: (date?: Date) => void;
  setEndDate?: (date?: Date) => void;
  dateRangePickerType: DateRangePickerType;
}

export const useDateRangePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  dateRangePickerType,
}: useDateRangePickerProps) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | undefined>(
    startDate,
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | undefined>(
    endDate,
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ariaLabel = useMemo(() => {
    switch (dateRangePickerType) {
      case DATE_RANGE_PICKER_TYPE.date:
        return '날짜 범위 선택';
      case DATE_RANGE_PICKER_TYPE.week:
        return '주 범위 선택';
      case DATE_RANGE_PICKER_TYPE.month:
        return '월 범위 선택';
      case DATE_RANGE_PICKER_TYPE.year:
        return '년 범위 선택';
      default:
        return '기간 선택';
    }
  }, [dateRangePickerType]);

  const CalendarComponent = useMemo(() => {
    switch (dateRangePickerType) {
      case DATE_RANGE_PICKER_TYPE.date:
        return (
          <Calendar
            selectedStartDate={selectedStartDate}
            setSelectedStartDate={setSelectedStartDate}
            selectedEndDate={selectedEndDate}
            setSelectedEndDate={setSelectedEndDate}
          />
        );
      default:
        return null;
    }
  }, [
    dateRangePickerType,
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
  ]);

  const handleCancel = useCallback(() => {
    setSelectedStartDate(undefined);
    setSelectedEndDate(undefined);
    setIsOpen(false);
  }, []);

  const handleSave = useCallback(() => {
    setStartDate?.(selectedStartDate);
    setEndDate?.(selectedEndDate);
    setIsOpen(false);
  }, [selectedStartDate, selectedEndDate, setStartDate, setEndDate]);

  return {
    isOpen,
    setIsOpen,
    ariaLabel,
    CalendarComponent,
    handleCancel,
    handleSave,
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
  };
};
