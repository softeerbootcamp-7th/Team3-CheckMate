import type { ReactNode } from 'react';

import { DefaultCardFetchBoundary } from '@/components/shared';

interface SalesPatternsFetchBoundaryProps {
  cardWidth?: number;
  cardHeight?: number;
  children: ReactNode;
}

export const SalesPatternsFetchBoundary = ({
  cardWidth,
  cardHeight,
  children,
}: SalesPatternsFetchBoundaryProps) => {
  return (
    <DefaultCardFetchBoundary cardWidth={cardWidth} cardHeight={cardHeight}>
      {children}
    </DefaultCardFetchBoundary>
  );
};
