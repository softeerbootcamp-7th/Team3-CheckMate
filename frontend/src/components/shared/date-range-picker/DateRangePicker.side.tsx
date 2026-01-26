import { memo } from 'react';

import { Info } from 'lucide-react';

import { type DateRangePickerType } from '@/constants/shared';
import { useDateRangePickerSide } from '@/hooks/shared';
import { cn } from '@/utils/shared';

import { DateRangePickerCancelButton } from './DateRangePicker.cancel-button';
import { DateRangePickerSaveButton } from './DateRangePicker.save-button';
import { DateRangePickerSelectedDate } from './DateRangePicker.selected-date';
import { DateRangePickerStartEndIndicator } from './DateRangePicker.start-end-indicator';

interface DateRangePickerSideProps {
  selectedStartDate?: Date;
  selectedEndDate?: Date;
  setSelectedStartDate: (date?: Date) => void;
  setSelectedEndDate: (date?: Date) => void;
  handleCancel: () => void;
  handleSave: () => void;
  dateRangePickerType: DateRangePickerType;
}

export const DateRangePickerSide = memo(
  ({
    selectedStartDate,
    selectedEndDate,
    setSelectedStartDate,
    setSelectedEndDate,
    handleCancel,
    handleSave,
    dateRangePickerType,
  }: DateRangePickerSideProps) => {
    const {
      alertText,
      isAllDateRangeSelected,
      isValidDateRange,
      formattedStartDate,
      formattedEndDate,
      handleResetStartDate,
      handleResetEndDate,
    } = useDateRangePickerSide({
      selectedStartDate,
      selectedEndDate,
      setSelectedStartDate,
      setSelectedEndDate,
      dateRangePickerType,
    });

    return (
      <div className="flex w-58.75 flex-col justify-between pt-250">
        <div className="flex flex-col gap-600">
          <div className="body-medium-bold">기간 선택</div>
          <div className="flex flex-col gap-350">
            <div className="flex items-center gap-350">
              <DateRangePickerStartEndIndicator />
              <div className="flex grow flex-col gap-350">
                <DateRangePickerSelectedDate
                  selectedDate={formattedStartDate}
                  resetDate={handleResetStartDate}
                  label="시작"
                />
                <DateRangePickerSelectedDate
                  selectedDate={formattedEndDate}
                  resetDate={handleResetEndDate}
                  label="종료"
                />
              </div>
            </div>
            <div
              className={cn(
                'caption-large flex items-center gap-50',
                isValidDateRange ? 'text-grey-700' : 'text-others-negative',
              )}
            >
              <Info className="size-3.5" />
              <span>{alertText}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-200">
          <DateRangePickerCancelButton handleCancel={handleCancel} />
          <DateRangePickerSaveButton
            handleSave={handleSave}
            disabled={!isAllDateRangeSelected || !isValidDateRange}
          />
        </div>
      </div>
    );
  },
);

DateRangePickerSide.displayName = 'DateRangePickerSide';
