import type { ComponentProps } from 'react';

import {
  DATE_RANGE_PICKER_TYPE,
  type DateRangePickerType,
} from '@/constants/shared';

import { DateCalendar } from './DateCalendar';
import { WeekCalendar } from './WeekCalendar';

// TODO: 추후 변경 예정
export const CalendarFactory = {
  [DATE_RANGE_PICKER_TYPE.date]: (
    props: ComponentProps<typeof DateCalendar>,
  ) => <DateCalendar {...props} />,
  [DATE_RANGE_PICKER_TYPE.week]: (
    props: ComponentProps<typeof WeekCalendar>,
  ) => <WeekCalendar {...props} />,
  [DATE_RANGE_PICKER_TYPE.month]: (
    props: ComponentProps<typeof DateCalendar>,
  ) => <DateCalendar {...props} />,
  [DATE_RANGE_PICKER_TYPE.year]: (
    props: ComponentProps<typeof DateCalendar>,
  ) => <DateCalendar {...props} />,
} satisfies Record<
  DateRangePickerType,
  (
    props:
      | ComponentProps<typeof DateCalendar>
      | ComponentProps<typeof WeekCalendar>,
  ) => React.ReactNode
>;
