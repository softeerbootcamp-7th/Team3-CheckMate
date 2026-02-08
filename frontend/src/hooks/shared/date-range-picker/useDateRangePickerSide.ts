import { useCallback, useMemo } from 'react';

import {
  DATE_RANGE_PICKER_TYPE,
  DATE_RANGE_SIDE_CONFIG,
  type DateRangePickerType,
} from '@/constants/shared';
import { getMondayOfWeek } from '@/utils/shared';

interface UseDateRangePickerSideProps {
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  setSelectedStartDate: (date?: Date) => void;
  setSelectedEndDate: (date?: Date) => void;
  dateRangePickerType: DateRangePickerType;
}

export const useDateRangePickerSide = ({
  selectedStartDate,
  selectedEndDate,
  setSelectedStartDate,
  setSelectedEndDate,
  dateRangePickerType,
}: UseDateRangePickerSideProps) => {
  const alertText = useMemo(() => {
    return DATE_RANGE_SIDE_CONFIG[dateRangePickerType].alertText;
  }, [dateRangePickerType]);

  const isAllDateRangeSelected = useMemo(() => {
    return !!selectedStartDate && !!selectedEndDate;
  }, [selectedStartDate, selectedEndDate]);

  const isValidDateRange = useMemo(() => {
    return DATE_RANGE_SIDE_CONFIG[dateRangePickerType].validate(
      selectedStartDate,
      selectedEndDate,
    );
  }, [dateRangePickerType, selectedStartDate, selectedEndDate]);

  const formattedStartDate = useMemo(() => {
    return (
      DATE_RANGE_SIDE_CONFIG[dateRangePickerType].formattedDate(
        selectedStartDate,
      ) ?? '선택'
    );
  }, [dateRangePickerType, selectedStartDate]);

  const formattedEndDate = useMemo(() => {
    return (
      DATE_RANGE_SIDE_CONFIG[dateRangePickerType].formattedDate(
        selectedEndDate,
      ) ?? '선택'
    );
  }, [dateRangePickerType, selectedEndDate]);

  const handleResetStartDate = useCallback(() => {
    if (selectedEndDate) {
      if (dateRangePickerType === DATE_RANGE_PICKER_TYPE.week) {
        const mondayOfSelectedEndDate = getMondayOfWeek(selectedEndDate);
        setSelectedStartDate(mondayOfSelectedEndDate);
      } else {
        setSelectedStartDate(new Date(selectedEndDate));
      }
      setSelectedEndDate(undefined);
      return;
    }
  }, [
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
    dateRangePickerType,
  ]);

  const handleResetEndDate = useCallback(() => {
    setSelectedEndDate(undefined);
  }, [setSelectedEndDate]);

  return {
    alertText,
    isAllDateRangeSelected,
    isValidDateRange,
    formattedStartDate,
    formattedEndDate,
    handleResetStartDate,
    handleResetEndDate,
  };
};
