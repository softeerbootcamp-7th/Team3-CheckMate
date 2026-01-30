import { type ComponentProps } from 'react';

import { CALENDAR_FACTORY, type DateRangePickerType } from '@/constants/shared';
import { useDateRangePicker } from '@/hooks/shared';

import { Popover, PopoverContent, PopoverTrigger } from '../shadcn-ui';

import { DateRangePickerSide } from './DateRangePickerSide';
import { DateRangePickerTrigger } from './DateRangePickerTrigger';

interface DateRangePickerProps extends ComponentProps<typeof Popover> {
  startDate?: Date;
  setStartDate?: (date?: Date) => void;
  endDate?: Date;
  setEndDate?: (date?: Date) => void;
  dateRangePickerType: DateRangePickerType;
  triggerClassName?: string;
  onSave?: () => void;
}

export const DateRangePicker = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  dateRangePickerType,
  triggerClassName,
  onSave,
  ...props
}: DateRangePickerProps) => {
  const {
    isOpen,
    handleOpenChange,
    ariaLabel,
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
    <Popover open={isOpen} onOpenChange={handleOpenChange} {...props}>
      <PopoverTrigger asChild>
        <DateRangePickerTrigger
          isOpen={isOpen}
          triggerClassName={triggerClassName}
          startDate={startDate}
          endDate={endDate}
          ariaLabel={ariaLabel}
        />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="shadow-card-floating rounded-400 bg-special-card-bg flex w-full gap-600 border-none p-4"
        aria-label={ariaLabel}
      >
        {CALENDAR_FACTORY[dateRangePickerType]({
          selectedStartDate,
          setSelectedStartDate,
          selectedEndDate,
          setSelectedEndDate,
        })}
        <DateRangePickerSide
          selectedStartDate={selectedStartDate}
          selectedEndDate={selectedEndDate}
          setSelectedStartDate={setSelectedStartDate}
          setSelectedEndDate={setSelectedEndDate}
          handleCancel={handleCancel}
          handleSave={() => {
            handleSave();
            if (onSave) {
              onSave();
            }
          }}
          dateRangePickerType={dateRangePickerType}
        />
      </PopoverContent>
    </Popover>
  );
};
