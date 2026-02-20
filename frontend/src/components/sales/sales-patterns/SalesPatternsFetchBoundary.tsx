import type { ReactNode } from 'react';

import { DefaultCardFetchBoundary } from '@/components/shared';

interface SalesPatternsFetchBoundaryProps {
  cardWidth?: number;
  cardHeight?: number;
  children: ReactNode;
}

const DEFAULT_CARD_WIDTH = 1060;
const DEFAULT_CARD_HEIGHT = 228;

export const SalesPatternsFetchBoundary = ({
  cardWidth,
  cardHeight,
  children,
}: SalesPatternsFetchBoundaryProps) => {
  return (
    <DefaultCardFetchBoundary
      cardWidth={cardWidth ?? DEFAULT_CARD_WIDTH}
      cardHeight={cardHeight ?? DEFAULT_CARD_HEIGHT}
    >
      {children}
    </DefaultCardFetchBoundary>
  );
};
