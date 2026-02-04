import { SelectTrigger, SelectValue } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface StoreBusinessHourSelectTriggerProps {
  selectedTime: string | null;
  isOpen: boolean;
  placeholder: string;
}

export const StoreBusinessHourSelectTrigger = ({
  selectedTime,
  isOpen,
  placeholder,
}: StoreBusinessHourSelectTriggerProps) => {
  return (
    <SelectTrigger
      className={cn(
        'rounded-150 bg-grey-100 body-medium-semibold! flex w-25 cursor-pointer items-center justify-end border-none px-250 py-200 [&_svg]:transition-transform [&_svg]:duration-200',
        selectedTime ? 'text-grey-900' : 'text-grey-400',
        isOpen && '[&_svg]:rotate-180',
      )}
      // tailwindcss outline-none 때문에 클래스 적용이 안돼서 inline style로 적용
      style={{
        outline: isOpen ? '1px solid var(--color-grey-300)' : 'none',
      }}
    >
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
  );
};
