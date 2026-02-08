import { memo } from 'react';

import {
  STORE_BUSINESS_HOURS_STATUS,
  type StoreBusinessWeekDay,
} from '@/constants/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';

import { StoreBusinessCheckbox } from './StoreBusinessCheckbox';
import { StoreBusinessHoursSelect } from './StoreBusinessHoursSelect';
import { StoreBusinessHoursWeekDayLabel } from './StoreBusinessHoursWeekDayLabel';

interface StoreBusinessHoursRowProps {
  label: StoreBusinessWeekDay['label'];
  businessHour: StoreRegisterForm['businessHours'][number];
  startHourTimeLimit?: string;
  endHourTimeLimit?: string;
  isOver24FromYesterday?: boolean;
  onSelectStartTime: (startTime: string) => void;
  onSelectEndTime: (endTime: string) => void;
  onCheck24: (is24: boolean) => void;
  onCheckClosed: (closed: boolean) => void;
}

export const StoreBusinessHoursRow = memo(
  ({
    label,
    businessHour,
    startHourTimeLimit,
    endHourTimeLimit,
    isOver24FromYesterday,
    onSelectStartTime,
    onSelectEndTime,
    onCheck24,
    onCheckClosed,
  }: StoreBusinessHoursRowProps) => {
    const { openTime, closeTime, is24, closed } = businessHour;
    return (
      <>
        <StoreBusinessHoursWeekDayLabel label={label} />
        <StoreBusinessHoursSelect
          placeholder={STORE_BUSINESS_HOURS_STATUS.START}
          selectedTime={openTime}
          startTimeLimit={
            isOver24FromYesterday ? startHourTimeLimit : undefined
          }
          onSelect={onSelectStartTime}
        />
        <span className="body-large-semibold text-grey-900 flex items-center justify-center leading-loose">
          ~
        </span>
        <StoreBusinessHoursSelect
          placeholder={STORE_BUSINESS_HOURS_STATUS.END}
          selectedTime={closeTime}
          startTimeLimit={endHourTimeLimit}
          onSelect={onSelectEndTime}
        />
        <StoreBusinessCheckbox
          checked={is24 ?? false}
          onCheckedChange={onCheck24}
          className="mr-4"
        />
        <StoreBusinessCheckbox
          checked={closed ?? false}
          onCheckedChange={onCheckClosed}
        />
      </>
    );
  },
);

StoreBusinessHoursRow.displayName = 'StoreBusinessHoursRow';
