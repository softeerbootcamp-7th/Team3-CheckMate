import { Button } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface DateRangeLabelProps {
  label: string;
  isSelected?: boolean;
  ariaLabel: string;
  onClick: () => void;
}
export const DateRangeLabel = ({
  label,
  isSelected = false,
  ariaLabel,
  onClick,
}: DateRangeLabelProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        'bg-grey-200 text-grey-700 border-grey-300 rounded-unlimit body-small-medium h-8 w-fit border px-300 py-0',
        isSelected && 'border-brand-main body-small-semibold bg-brand-20',
      )}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span className={cn(isSelected && 'text-brand-main')}>{label}</span>
    </Button>
  );
};
