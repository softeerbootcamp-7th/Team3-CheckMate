import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/shared';

interface BadgeProps {
  show?: boolean;
  position?: 'top-left' | 'top-right' | 'right' | 'left';
}
export const Badge = ({
  children,
  show = false,
  position = 'top-right',
}: PropsWithChildren & BadgeProps) => {
  return (
    // children의 우측 상단에 작은 점
    <span
      className={cn(
        'before:bg-brand-main relative before:absolute before:size-[6px] before:rounded-full',
        !show && 'before:opacity-0',
        position === 'top-left' && 'before:-top-px before:-left-1.25',
        position === 'top-right' && 'before:-top-px before:-right-px',
        position === 'right' &&
          'before:top-[50%] before:-right-2.5 before:translate-y-[-0.5px]',
      )}
    >
      {children}
    </span>
  );
};
