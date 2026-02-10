import { memo } from 'react';

import { SelectItem } from '@/components/shared/shadcn-ui';
import { FINAL_STORE_BUSINESS_HOURS_TIME } from '@/constants/onboarding/store-register';
import { cn } from '@/utils/shared';

interface StoreBusinessHoursSelectItemProps {
  hour: number;
  minute: number;
}

export const StoreBusinessHoursSelectItem = memo(
  ({ hour, minute }: StoreBusinessHoursSelectItemProps) => {
    const { hour: finalHour, minute: finalMinute } =
      FINAL_STORE_BUSINESS_HOURS_TIME;
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    return (
      <SelectItem
        value={formattedTime}
        className={cn(
          'body-medium-medium! text-grey-700 bg-grey-100 hover:bg-grey-300 active:bg-grey-500 active:text-grey-50 flex h-9 cursor-pointer items-center justify-center rounded-none',
          !(hour === finalHour && minute === finalMinute) &&
            'border-grey-300 border-b',
        )}
      >
        {formattedTime}
      </SelectItem>
    );
  },
);

StoreBusinessHoursSelectItem.displayName = 'StoreBusinessHoursSelectItem';
