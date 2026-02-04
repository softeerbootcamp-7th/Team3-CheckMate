import { memo } from 'react';

import type { StoreBusinessWeekDay } from '@/constants/onboarding/store-register';

interface StoreBusinessHoursWeekDayLabelProps {
  label: StoreBusinessWeekDay['label'];
}
export const StoreBusinessHoursWeekDayLabel = memo(
  ({ label }: StoreBusinessHoursWeekDayLabelProps) => {
    return (
      <span className="body-large-semibold text-grey-900 leading-loose">
        {label}
      </span>
    );
  },
);

StoreBusinessHoursWeekDayLabel.displayName = 'StoreBusinessHoursWeekDayLabel';
