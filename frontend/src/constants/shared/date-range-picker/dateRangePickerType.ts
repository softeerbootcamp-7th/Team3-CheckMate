import type { ValueOf } from '@/utils/shared';

export const DATE_RANGE_PICKER_TYPE = {
  date: 'date',
  week: 'week',
  month: 'month',
  year: 'year',
} as const;

export type DateRangePickerType = ValueOf<typeof DATE_RANGE_PICKER_TYPE>;
