import type { PropsWithChildren } from 'react';

import { cn } from '@/utils/shared';

interface MenuAnalysisCardProps extends PropsWithChildren {
  title?: string;
  className?: string;
}

export const MenuAnalysisCard = ({
  title,
  className,
  children,
}: MenuAnalysisCardProps) => {
  return (
    <article className={cn('card', className)}>
      {title && <h3>{title}</h3>}
      {children}
    </article>
  );
};
