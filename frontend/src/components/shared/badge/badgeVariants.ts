import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'before:bg-brand-main relative before:absolute before:size-1.5 before:rounded-full',
  {
    variants: {
      position: {
        'top-left': 'before:-top-px before:-left-1.25',
        'top-right': 'before:-top-px before:-right-px',
        right: 'before:top-[50%] before:-right-2.5 before:translate-y-[-0.5px]',
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
