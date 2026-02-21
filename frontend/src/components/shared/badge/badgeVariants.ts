import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'before:bg-brand-main relative before:absolute before:size-1.5 before:rounded-full',
  {
    variants: {
      position: {
        'top-left': 'before:-top-px before:-translate-x-1',
        'top-right': 'before:-top-px before:right-0',
        right:
          'before:top-[50%] before:right-0 before:translate-x-2.5 before:translate-y-[-1.5px]',
      },
      show: {
        true: '',
        false: 'before:opacity-0',
      },
    },
    defaultVariants: {
      position: 'top-right',
      show: false,
    },
  },
);
