import type { ReactNode } from 'react';

import { DefaultCardFetchBoundary } from '@/components/shared';
import { cn } from '@/utils/shared';

interface SalesPatternsFetchBoundaryProps {
  className?: string;
  children: ReactNode;
}

export const SalesPatternsFetchBoundary = ({
  className,
  children,
}: SalesPatternsFetchBoundaryProps) => {
  return (
    <DefaultCardFetchBoundary className={cn(className, 'h-70 w-265')}>
      {children}
    </DefaultCardFetchBoundary>
  );
};
