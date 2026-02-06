import { CircleCheck } from 'lucide-react';

interface InputSuccessMessageProps {
  message?: string;
}

export const InputSuccessMessage = ({ message }: InputSuccessMessageProps) => {
  return (
    <p className="text-small-medium text-brand-500 animate-fade-in flex items-center gap-1">
      <CircleCheck className="size-4" />
      {message}
    </p>
  );
};
