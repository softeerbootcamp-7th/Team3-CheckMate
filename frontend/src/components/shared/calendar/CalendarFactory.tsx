import type { ComponentProps } from 'react';

import {
  DATE_RANGE_PICKER_TYPE,
  type DateRangePickerType,
} from '@/constants/shared';

import { DateCalendar } from './DateCalendar';
import { MonthCalendar } from './MonthCalendar';
import { WeekCalendar } from './WeekCalendar';
import { YearCalendar } from './YearCalendar';

// TODO: 추후 변경 예정
export const CalendarFactory = {
  [DATE_RANGE_PICKER_TYPE.date]: (
    props: ComponentProps<typeof DateCalendar>,
  ) => <DateCalendar {...props} />,
  [DATE_RANGE_PICKER_TYPE.week]: (
    props: ComponentProps<typeof WeekCalendar>,
  ) => <WeekCalendar {...props} />,
  [DATE_RANGE_PICKER_TYPE.month]: (
    props: ComponentProps<typeof MonthCalendar>,
  ) => <MonthCalendar {...props} />,
  [DATE_RANGE_PICKER_TYPE.year]: (
    props: ComponentProps<typeof YearCalendar>,
  ) => <YearCalendar {...props} />,
} satisfies Record<
  DateRangePickerType,
  (
    props:
      | ComponentProps<typeof DateCalendar>
      | ComponentProps<typeof WeekCalendar>
      | ComponentProps<typeof MonthCalendar>
      | ComponentProps<typeof YearCalendar>,
  ) => React.ReactNode
>;
