import { memo } from 'react';

import { Checkbox } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface StoreBusinessCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  readOnly?: boolean;
}

export const StoreBusinessCheckbox = memo(
  ({
    checked,
    onCheckedChange,
    className,
    readOnly,
  }: StoreBusinessCheckboxProps) => {
    return (
      <Checkbox
        disabled={readOnly}
        className={cn(
          'data-[state=checked]:bg-brand-main data-[state=checked]:[&_svg]:text-grey-50 border-grey-500 size-7 self-center justify-self-end border data-[state=checked]:border-none [&_svg]:size-5',
          className,
        )}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    );
  },
);

StoreBusinessCheckbox.displayName = 'StoreBusinessCheckbox';
