import { cn } from '@/utils/shared';

interface InputErrorMessageProps {
  message?: string;
  className?: string;
}

export const InputErrorMessage = ({
  message,
  className,
}: InputErrorMessageProps) => {
  return (
    <p className={cn('text-body-small text-others-red', className)}>
      *{message}
    </p>
  );
};
