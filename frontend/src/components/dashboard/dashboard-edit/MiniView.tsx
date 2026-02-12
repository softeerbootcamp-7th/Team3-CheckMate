import { useLocation } from 'react-router-dom';

import { useEditCard } from '@/hooks/dashboard';

import { MiniViewActiveCard } from './MiniViewActiveCard';
import { MiniViewEmptyCard } from './MiniViewEmptyCard';

export const MiniView = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const title = searchParams.get('tab') || '알 수 없음';

  const { cards, emptyCellCount } = useEditCard();

  return (
    <section className="flex min-w-120 grow flex-col p-6.25 pt-20">
      <header className="mb-20 pl-5">
        <h1 className="title-large-bold text-grey-900">{title}</h1>
      </header>
      <div className="grid grow grid-cols-3 grid-rows-3 gap-5">
        {Array.from({ length: emptyCellCount }).map((_, index) => (
          <MiniViewEmptyCard key={`grid-${index}`} />
        ))}
        {/* 활성 카드 */}
        {cards.map((card) => (
          <MiniViewActiveCard
            key={card.code}
            cardCode={card.code}
            posX={card.colNo}
            posY={card.rowNo}
          />
        ))}
      </div>
    </section>
  );
};
