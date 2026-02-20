import { memo } from 'react';

export const MiniViewEmptyCard = memo(() => {
  return (
    <div className="rounded-400 outline-grey-500 outline-1 -outline-offset-3 outline-dashed" />
  );
});

MiniViewEmptyCard.displayName = 'MiniViewEmptyCard';
