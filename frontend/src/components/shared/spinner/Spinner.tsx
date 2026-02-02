import { SpinnerIcon } from '@/assets/icons';
import { cn } from '@/utils/shared';

interface SpinnerProps {
  className?: string;
}

export const Spinner = ({ className }: SpinnerProps) => {
  return (
    <SpinnerIcon
      className={cn('animate-spin', className)}
      role="status"
      aria-label="로딩 중"
    />
  );
};
