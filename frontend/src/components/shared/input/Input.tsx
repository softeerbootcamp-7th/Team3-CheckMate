import { type InputHTMLAttributes, type Ref, useId } from 'react';

import { cn } from '@/utils/shared';

import { InputErrorMessage } from './InputErrorMessage';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  errorMessage?: string;
  className?: string;
  inputClassName?: string;
  errorClassName?: string;
  errorMessagePosition?: 'bottom' | 'right';
  label?: string;
  description?: string;
  ref?: Ref<HTMLInputElement | null>;
}

export const Input = ({
  isError,
  errorMessage,
  className,
  inputClassName,
  errorClassName,
  errorMessagePosition = 'bottom',
  label,
  description,
  ref,
  ...props
}: InputProps) => {
  const id = useId();
  const descriptionId = `${id}-description`;

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      {label && (
        <label
          htmlFor={id}
          className="body-large-semibold text-grey-900 flex shrink-0 items-center gap-3 text-nowrap"
        >
          {label}
          {description && (
            <span
              id={descriptionId}
              className="body-medium-medium text-grey-600 shrink-0 text-nowrap"
            >
              {description}
            </span>
          )}
        </label>
      )}
      <div
        className={cn(
          'flex gap-1.5',
          errorMessagePosition === 'bottom' && 'flex-col',
          errorMessagePosition === 'right' && 'items-center gap-2.5',
        )}
      >
        <input
          id={id}
          aria-describedby={description ? descriptionId : undefined}
          {...props}
          ref={ref}
          className={cn(
            'rounded-200 bg-grey-100 focus:outline-grey-300 placeholder:text-grey-500 body-large-medium w-full grow px-400 py-250 focus:outline-1',
            inputClassName,
            isError &&
              'outline-others-negative focus:outline-others-negative outline-1',
          )}
        />
        {isError && (
          <InputErrorMessage
            message={errorMessage}
            className={errorClassName}
          />
        )}
      </div>
    </div>
  );
};
