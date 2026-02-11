import {
  memo,
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { Spinner } from '@/components/shared';
import { Select, SelectContent } from '@/components/shared/shadcn-ui';
import {
  STORE_BUSINESS_HOURS_STATUS,
  STORE_BUSINESS_HOURS_TIME_LIST,
} from '@/constants/onboarding/store-register';

import { StoreBusinessHoursSelectItem } from './StoreBusinessHoursSelectItem';
import { StoreBusinessHourSelectTrigger } from './StoreBusinessHoursSelectTrigger';

interface StoreBusinessHoursSelectProps {
  placeholder: string;
  selectedTime?: string;
  startTimeLimit?: string;
  onSelect: (time: string) => void;
  readOnly?: boolean;
}

export const StoreBusinessHoursSelect = memo(
  ({
    placeholder,
    selectedTime,
    startTimeLimit,
    onSelect,
    readOnly,
  }: StoreBusinessHoursSelectProps) => {
    const [showSelect, setShowSelect] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
      startTransition(() => {
        setShowSelect(true);
      });
    }, []);

    const handleOpenChange = useCallback((open: boolean) => {
      setIsOpen(open);
    }, []);

    const [startLimitHour, startLimitMinute] =
      startTimeLimit?.split(':').map(Number) ?? [];

    const filteredTimeList = useMemo(() => {
      const standardIndex = STORE_BUSINESS_HOURS_TIME_LIST.findIndex(
        ({ hour, minute }) => {
          return hour === startLimitHour && minute === startLimitMinute;
        },
      );

      if (standardIndex === -1) {
        return STORE_BUSINESS_HOURS_TIME_LIST;
      }

      if (placeholder === STORE_BUSINESS_HOURS_STATUS.START) {
        return [...STORE_BUSINESS_HOURS_TIME_LIST.slice(standardIndex + 1)];
      }

      return [
        ...STORE_BUSINESS_HOURS_TIME_LIST.slice(standardIndex + 1),
        ...STORE_BUSINESS_HOURS_TIME_LIST.slice(0, standardIndex),
      ];
    }, [startLimitHour, startLimitMinute, placeholder]);

    return (
      <Select
        open={isOpen}
        onOpenChange={handleOpenChange}
        value={selectedTime ?? undefined}
        onValueChange={onSelect}
      >
        <StoreBusinessHourSelectTrigger
          selectedTime={selectedTime}
          isOpen={isOpen}
          placeholder={placeholder}
          readOnly={readOnly}
        />
        <SelectContent
          className="scrollbar-hidden rounded-150 max-h-54 w-25.5! overflow-y-auto border-none"
          position="popper"
        >
          {showSelect ? (
            <>
              {filteredTimeList.map(({ hour, minute }) => {
                return (
                  <StoreBusinessHoursSelectItem
                    key={`${hour}:${minute}`}
                    hour={hour}
                    minute={minute}
                  />
                );
              })}
            </>
          ) : (
            <div className="bg-grey-100 flex h-8 items-center justify-center">
              <Spinner className="text-brand-main size-5" />
            </div>
          )}
        </SelectContent>
      </Select>
    );
  },
);

StoreBusinessHoursSelect.displayName = 'StoreBusinessHoursSelect';
