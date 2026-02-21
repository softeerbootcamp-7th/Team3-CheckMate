import type { ReactNode } from 'react';

import { DefaultCardFetchBoundary } from '@/components/shared';

interface RevenueTrendFetchBoundaryProps {
  cardWidth?: number;
  cardHeight?: number;
  children: ReactNode;
}

const DEFAULT_CARD_WIDTH = 1060;
const DEFAULT_CARD_HEIGHT = 228;

export const RevenueTrendFetchBoundary = ({
  cardWidth,
  cardHeight,
  children,
}: RevenueTrendFetchBoundaryProps) => {
  return (
    <DefaultCardFetchBoundary
      cardWidth={cardWidth ?? DEFAULT_CARD_WIDTH}
      cardHeight={cardHeight ?? DEFAULT_CARD_HEIGHT}
    >
      {children}
    </DefaultCardFetchBoundary>
  );
};
