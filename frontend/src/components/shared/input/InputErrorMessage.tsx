import { cn } from '@/utils/shared';

interface InputErrorMessageProps {
  message?: string;
  className?: string;
}

export const InputErrorMessage = ({
  message,
  className,
}: InputErrorMessageProps) => {
  if (!message) {
    return null;
  }

  return (
    <p
      className={cn('text-body-small text-others-red animate-shake', className)}
    >
      *{message}
    </p>
  );
};
