import { cva } from 'class-variance-authority';

export const rankBadgeVariants = cva(
  'rounded-100 flex items-center justify-center',
  {
    variants: {
      variant: {
        default: 'bg-grey-200 text-grey-700',
        highlight: 'bg-brand-50 text-brand-main',
      },
      size: {
        sm: 'size-6 body-small-bold',
        md: 'size-7 body-small-bold',
        lg: 'size-8 body-medium-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  },
);
