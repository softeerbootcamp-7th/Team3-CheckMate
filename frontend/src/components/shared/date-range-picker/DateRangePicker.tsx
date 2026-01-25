import { type DateRangePickerType } from '@/constants/shared';
import { useDateRangePicker } from '@/hooks/shared';

import { Button, Popover, PopoverContent, PopoverTrigger } from '../shadcn-ui';

import { DateRangePickerSide } from './DateRangePicker.side';

interface DateRangePickerProps {
  startDate?: Date;
  setStartDate?: (date?: Date) => void;
  endDate?: Date;
  setEndDate?: (date?: Date) => void;
  dateRangePickerType: DateRangePickerType;
}

export const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  dateRangePickerType,
}: DateRangePickerProps) => {
  const {
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
  } = useDateRangePicker({
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    dateRangePickerType,
  });

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="bg-grey-200 text-grey-700 border-grey-300 rounded-unlimit body-small-medium flex h-8 w-fit items-center justify-center border px-300"
          aria-label={ariaLabel}
        >
          기간 선택
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="shadow-card-floating rounded-400 bg-special-card-bg flex w-full gap-600 border-none p-4"
        aria-label={ariaLabel}
      >
        {CalendarComponent}
        <DateRangePickerSide
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          setSelectedStartDate={setSelectedStartDate}
          setSelectedEndDate={setSelectedEndDate}
          handleCancel={handleCancel}
          handleSave={handleSave}
          dateRangePickerType={dateRangePickerType}
        />
      </PopoverContent>
    </Popover>
  );
};
