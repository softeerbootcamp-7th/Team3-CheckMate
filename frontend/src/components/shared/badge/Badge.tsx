import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/shared';

interface BadgeProps {
  show?: boolean;
  position?: 'left' | 'right';
}
export const Badge = ({
  children,
  show = false,
  position = 'right',
}: PropsWithChildren & BadgeProps) => {
  return (
    // children의 우측 상단에 작은 점
    <span
      className={cn(
        'before:bg-brand-main relative before:absolute before:-top-px before:size-[6px] before:rounded-full',
        !show && 'before:opacity-0',
        position === 'left' && 'before:-left-px',
        position === 'right' && 'before:-right-px',
      )}
    >
      {children}
    </span>
  );
};
