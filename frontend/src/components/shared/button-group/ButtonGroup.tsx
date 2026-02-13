import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
} from 'react';

import { cn } from '@/utils/shared';

import { Button } from '../shadcn-ui';

export const ButtonGroup = ({
  children,
  ...props
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex justify-end gap-2.5" {...props}>
      {children}
    </div>
  );
};

interface ButtonProps {
  message: string;
  disabled?: boolean;
}
const PositiveButton = ({
  message,
  disabled = false,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      {...props}
      className={cn(
        disabled
          ? 'bg-grey-200 text-grey-400 pointer-events-none'
          : 'bg-grey-900 text-grey-50',
        'body-medium-bold! rounded-200 w-20 border-none px-350 py-200 pt-250',
        props.className,
      )}
    >
      {message}
    </Button>
  );
};

const NegativeButton = ({
  message,
  ...props
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      {...props}
      className={cn(
        'rounded-200 text-grey-700 body-medium-bold! w-20 border-none px-350 py-200',
        props.className,
      )}
    >
      {message}
    </Button>
  );
};

ButtonGroup.Positive = PositiveButton;
ButtonGroup.Negative = NegativeButton;
