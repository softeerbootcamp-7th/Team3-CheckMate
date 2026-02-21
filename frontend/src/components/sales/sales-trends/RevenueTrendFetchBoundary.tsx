import type { ReactNode } from 'react';

import { DefaultCardFetchBoundary } from '@/components/shared';
import { cn } from '@/utils/shared';

interface RevenueTrendFetchBoundaryProps {
  children: ReactNode;
  className?: string;
}

export const RevenueTrendFetchBoundary = ({
  children,
  className,
}: RevenueTrendFetchBoundaryProps) => {
  return (
    <DefaultCardFetchBoundary className={cn('h-57 w-265', className)}>
      {children}
    </DefaultCardFetchBoundary>
  );
};
