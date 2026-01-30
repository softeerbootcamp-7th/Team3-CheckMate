import { useCallback, useState } from 'react';

import { Select, SelectContent } from '@/components/shared/shadcn-ui';
import { STORE_BUSINESS_HOURS_TIME_LIST } from '@/constants/onboarding/store-register';

import { StoreBusinessHoursSelectItem } from './StoreBusinessHoursSelectItem';
import { StoreBusinessHourSelectTrigger } from './StoreBusinessHoursSelectTrigger';

interface StoreBusinessHoursSelectProps {
  placeholder: string;
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

export const StoreBusinessHoursSelect = ({
  placeholder,
  selectedTime,
  onSelect,
}: StoreBusinessHoursSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

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
      />
      <SelectContent
        className="scrollbar-hidden rounded-150 max-h-54 w-25.5! overflow-y-auto border-none"
        position="popper"
      >
        {STORE_BUSINESS_HOURS_TIME_LIST.map(({ hour, minute }) => {
          return (
            <StoreBusinessHoursSelectItem
              key={`${hour}:${minute}`}
              hour={hour}
              minute={minute}
            />
          );
        })}
      </SelectContent>
    </Select>
  );
};
