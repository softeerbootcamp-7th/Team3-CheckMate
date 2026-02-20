import { memo } from 'react';

import type { MetricItem } from '@/constants/dashboard';

import { CardEditViewCard } from './CardEditViewCard';

interface CardEditViewTabContentItemProps {
  items: MetricItem;
}
export const CardEditViewTabContentItem = memo(
  ({ items }: CardEditViewTabContentItemProps) => {
    return (
      <li>
        <h3 className="body-medium-semibold text-grey-800 bg-grey-200 rounded-150 mt-6 mb-3 px-300 py-150">
          {items.label}
        </h3>
        <ul className="grid grid-cols-3 gap-5">
          {items.cardCodes.map((cardCode) => (
            <CardEditViewCard key={`edit-${cardCode}`} cardCode={cardCode} />
          ))}
        </ul>
      </li>
    );
  },
  (prevProps, nextProps) => prevProps.items.label === nextProps.items.label,
);
CardEditViewTabContentItem.displayName = 'CardEditViewTabContentItem';
