import { type InputHTMLAttributes, useId } from 'react';

import { cn } from '@/utils/shared';

import { InputErrorMessage } from './InputErrorMessage';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
  label?: string;
  description?: string;
}

export const Input = ({
  isError,
  errorMessage,
  className,
  inputClassName,
  label,
  description,
  ...props
}: InputProps) => {
  const id = useId();

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {label && (
        <label
          htmlFor={id}
          className="body-large-semibold text-grey-900 flex items-center gap-3"
        >
          {label}
          {description && (
            <span className="body-medium-medium text-grey-600">
              {description}
            </span>
          )}
        </label>
      )}
      <div className="flex flex-col gap-1.5">
        <input
          id={id}
          {...props}
          className={cn(
            'rounded-200 bg-grey-100 focus:outline-grey-300 placeholder:text-grey-500 body-large-medium w-full px-400 py-250 focus:outline-1',
            isError &&
              'outline-others-negative focus:outline-others-negative outline-1',
            inputClassName,
          )}
        />
        {isError && <InputErrorMessage message={errorMessage} />}
      </div>
    </div>
  );
};
