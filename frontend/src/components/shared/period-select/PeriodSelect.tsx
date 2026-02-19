import {
  DATE_RANGE_PICKER_TYPE,
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
  className,
}: PeriodSelectProps<T>) => {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      {(Object.values(PERIOD_PRESETS[periodPreset]) as PeriodType<T>[]).map(
        (period) => (
          <DateRangeLabel
            key={period as string}
            label={period as string}
            ariaLabel={`${period}로 기간 선택`}
            isSelected={periodType === period}
            onClick={() => {
              setPeriodType(period);
              setStartDate(undefined);
              setEndDate(undefined);
            }}
          />
        ),
      )}
      <DateRangePicker
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        dateRangePickerType={DATE_RANGE_PICKER_TYPE.date}
        onSave={() => setPeriodType(undefined)}
      />
    </div>
  );
};
