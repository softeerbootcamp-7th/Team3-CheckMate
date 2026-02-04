import { memo, useCallback, useState } from 'react';

import { Switch } from '@/components/shared/shadcn-ui';
import { type StoreBusinessWeekDay } from '@/constants/onboarding/store-register';

import { StoreBusinessHoursSelect } from './StoreBusinessHoursSelect';

interface StoreBusinessHoursRowProps {
  label: StoreBusinessWeekDay['label'];
  id: StoreBusinessWeekDay['id'];
}

export const StoreBusinessHoursRow = memo(
  ({ label, id }: StoreBusinessHoursRowProps) => {
    const [selectedStartTime, setSelectedStartTime] = useState<string | null>(
      null,
    );
    const [selectedEndTime, setSelectedEndTime] = useState<string | null>(null);

    const handleStartTimeSelect = useCallback((time: string) => {
      setSelectedStartTime(time);
    }, []);

    const handleEndTimeSelect = useCallback((time: string) => {
      setSelectedEndTime(time);
    }, []);

    return (
      <>
        <span
          className="body-large-semibold text-grey-900 leading-loose"
          id={id}
        >
          {label}
        </span>
        <StoreBusinessHoursSelect
          placeholder="시작"
          selectedTime={selectedStartTime}
          onSelect={handleStartTimeSelect}
        />
        <span className="body-large-semibold text-grey-900 flex items-center justify-center leading-loose">
          ~
        </span>
        <StoreBusinessHoursSelect
          placeholder="마감"
          selectedTime={selectedEndTime}
          onSelect={handleEndTimeSelect}
        />
        <Switch className="cursor-pointer self-center justify-self-end" />
      </>
    );
  },
);

StoreBusinessHoursRow.displayName = 'StoreBusinessHoursRow';
