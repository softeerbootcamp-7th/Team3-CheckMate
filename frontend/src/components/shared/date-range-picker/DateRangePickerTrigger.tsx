import {
  type ComponentPropsWithRef,
  type MouseEventHandler,
  useMemo,
} from 'react';

import { cn, formatDateYYYYMMDD } from '@/utils/shared';

import { Button } from '../shadcn-ui';

interface DateRangePickerTriggerProps extends ComponentPropsWithRef<
  typeof Button
> {
  isOpen: boolean;
  triggerClassName?: string;
  startDate?: Date;
  endDate?: Date;
  ariaLabel: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const DateRangePickerTrigger = ({
  isOpen,
  triggerClassName,
  startDate,
  endDate,
  ariaLabel,
  onClick,
  ref,
  ...props
}: DateRangePickerTriggerProps) => {
  const isSelectedDateRange = useMemo(() => {
    return !!startDate && !!endDate;
  }, [startDate, endDate]);
  return (
    <Button
      variant="ghost"
      className={cn(
        'bg-grey-200 text-grey-700 border-grey-300 rounded-unlimit body-small-medium flex h-8 w-fit items-center justify-center gap-0 border px-300 py-0 whitespace-pre',
        (isOpen || isSelectedDateRange) &&
          'border-brand-main body-small-semibold',
        isOpen && 'bg-brand-main text-grey-50',
        isSelectedDateRange && 'bg-brand-20 text-brand-main',
        triggerClassName,
      )}
      aria-label={ariaLabel}
      ref={ref}
      onClick={onClick}
      {...props}
    >
      <span>기간 선택 {isSelectedDateRange && ' - '}</span>
      {isSelectedDateRange && (
        <span className={cn(!triggerClassName && 'text-grey-900')}>
          {formatDateYYYYMMDD(startDate)} - {formatDateYYYYMMDD(endDate)}
        </span>
      )}
    </Button>
  );
};
