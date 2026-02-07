import type { ComponentProps } from 'react';

import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shared';

import { rankBadgeVariants } from './RankBadgeVariant';

interface RankBadgeProps
  extends VariantProps<typeof rankBadgeVariants>, ComponentProps<'div'> {
  rank: number | string;
}

export const RankBadge = ({
  rank,
  variant,
  size,
  className,
  ...props
}: RankBadgeProps) => {
  return (
    <div
      className={cn(rankBadgeVariants({ variant, size, className }))}
      {...props}
    >
      {rank}
    </div>
  );
};
