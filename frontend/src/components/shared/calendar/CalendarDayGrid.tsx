import { memo } from 'react';

import { DAY_OF_WEEK_LIST } from '@/constants/shared';

import { CalendarDayCell } from './CalendarDayCell';

export const CalendarDayGrid = memo(() => {
  return (
    <div className="grid grid-cols-7">
      {DAY_OF_WEEK_LIST.map((day, index) => {
        return <CalendarDayCell key={day} text={day} index={index} />;
      })}
    </div>
  );
});

CalendarDayGrid.displayName = 'CalendarDayGrid';
