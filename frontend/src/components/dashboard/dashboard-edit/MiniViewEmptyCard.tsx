import { memo } from 'react';

export const MiniViewEmptyCard = memo(() => {
  return (
    <div className="rounded-400 border-grey-500 border-[1.5px] border-dashed" />
  );
});

MiniViewEmptyCard.displayName = 'MiniViewEmptyCard';
