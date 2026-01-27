import type { ComponentProps } from 'react';

import { Calendar } from '@/components/shared';

import {
  DATE_RANGE_PICKER_TYPE,
  type DateRangePickerType,
} from '../date-range-picker';

// TODO: 추후 변경 예정
export const CALENDAR_FACTORY: Record<
  DateRangePickerType,
  (props: ComponentProps<typeof Calendar>) => React.ReactNode
> = {
  [DATE_RANGE_PICKER_TYPE.date]: (props: ComponentProps<typeof Calendar>) => (
    <Calendar {...props} />
  ),
  [DATE_RANGE_PICKER_TYPE.week]: (props: ComponentProps<typeof Calendar>) => (
    <Calendar {...props} />
  ),
  [DATE_RANGE_PICKER_TYPE.month]: (props: ComponentProps<typeof Calendar>) => (
    <Calendar {...props} />
  ),
  [DATE_RANGE_PICKER_TYPE.year]: (props: ComponentProps<typeof Calendar>) => (
    <Calendar {...props} />
  ),
};
