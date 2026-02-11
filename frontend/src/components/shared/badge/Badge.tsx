import type { PropsWithChildren } from 'react';

import type { VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/shared';

import { badgeVariants } from './badgeVariants';

export const Badge = ({
  children,
  show = false,
  position = 'top-right',
}: PropsWithChildren & VariantProps<typeof badgeVariants>) => {
  return (
    // children의 우측 상단에 작은 점
    <span className={cn(badgeVariants({ position, show }))}>{children}</span>
  );
};
