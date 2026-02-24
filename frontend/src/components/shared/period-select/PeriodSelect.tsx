import { type MouseEvent, useCallback, useState } from 'react';

import {
  DATE_RANGE_PICKER_TYPE,
  type DateRangePickerType,
  PERIOD_PRESETS,
  type PeriodPresetType,
  type PeriodType,
} from '@/constants/shared';
import { cn } from '@/utils/shared';

import { DateRangeLabel } from '../date-range-label';
import { DateRangePicker } from '../date-range-picker';

interface PeriodSelectProps<T extends PeriodPresetType> {
  periodPreset: T; // 현재 선택된 프리셋 그룹 객체 e.g. 'dayWeekMonth'
  periodType: PeriodType<T> | undefined; // 해당 그룹 내의 키값들 (유니온) 또는 기간선택 e.g. '오늘', '이번주', '이번달'
  setPeriodType: (preset: PeriodType<T> | undefined) => void;
  startDate?: Date;
  setStartDate: (date?: Date) => void;
  endDate?: Date;
  setEndDate: (date?: Date) => void;
  dateRangePickerType?: DateRangePickerType;
  className?: string;
}

export const PeriodSelect = <T extends PeriodPresetType>({
  periodPreset,
  periodType,
  setPeriodType,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  dateRangePickerType,
  className,
}: PeriodSelectProps<T>) => {
  const [lastDateRange, setLastDateRange] = useState<{
    start?: Date;
    end?: Date;
  }>({ start: startDate, end: endDate });

  const handleClickLabel = useCallback(
    (period: PeriodType<T>) => {
      setPeriodType(period);
      if (startDate && endDate) {
        setLastDateRange({ start: startDate, end: endDate });
        setStartDate(undefined);
        setEndDate(undefined);
      }
    },
    [startDate, endDate, setStartDate, setEndDate, setPeriodType],
  );

  const handleClickTrigger = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (lastDateRange.start && lastDateRange.end) {
        event.preventDefault();
        event.stopPropagation();
        setStartDate(lastDateRange.start);
        setEndDate(lastDateRange.end);
        setLastDateRange({});
        setPeriodType(undefined);
      }
    },
    [lastDateRange, setStartDate, setEndDate, setPeriodType],
  );
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {(Object.values(PERIOD_PRESETS[periodPreset]) as PeriodType<T>[]).map(
        (period) => (
          <DateRangeLabel
            key={period as string}
            label={period as string}
            ariaLabel={`${period}로 기간 선택`}
            isSelected={periodType === period}
            onClick={() => handleClickLabel(period)}
          />
        ),
      )}
      <DateRangePicker
        startDate={startDate || lastDateRange.start}
        setStartDate={setStartDate}
        endDate={endDate || lastDateRange.end}
        setEndDate={setEndDate}
        dateRangePickerType={dateRangePickerType ?? DATE_RANGE_PICKER_TYPE.date}
        onSave={() => setPeriodType(undefined)}
        triggerClassName={
          !startDate && !endDate
            ? 'bg-grey-200 text-grey-700 border-grey-300'
            : ''
        }
        onClickTrigger={handleClickTrigger}
      />
    </div>
  );
};
