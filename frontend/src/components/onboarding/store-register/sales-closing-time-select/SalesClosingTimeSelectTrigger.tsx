import { SelectTrigger, SelectValue } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface SalesClosingTimeSelectTriggerProps {
  isOpen: boolean;
}

export const SalesClosingTimeSelectTrigger = ({
  isOpen,
}: SalesClosingTimeSelectTriggerProps) => {
  return (
    <SelectTrigger
      className={cn(
        'rounded-150 bg-grey-100 body-medium-semibold! flex w-25 cursor-pointer items-center justify-end border-none px-250 py-200 [&_svg]:transition-transform [&_svg]:duration-200',
        isOpen && '[&_svg]:rotate-180',
      )}
      // tailwindcss outline-none 때문에 클래스 적용이 안돼서 inline style로 적용
      style={{
        outline: isOpen ? '1px solid var(--color-grey-300)' : 'none',
      }}
    >
      <SelectValue />
    </SelectTrigger>
  );
};
