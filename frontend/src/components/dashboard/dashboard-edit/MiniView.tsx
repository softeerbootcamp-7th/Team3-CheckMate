import { useLocation } from 'react-router-dom';

import { MiniViewCard } from './MiniViewCard';

export const MiniView = () => {
  const searchParams = new URLSearchParams(useLocation().search);
  const title = searchParams.get('tab') || '알 수 없음';

  const activeCard = [
    {
      code: 'SLS_01_01',
      posX: 1,
      posY: 2,
    },
    {
      code: 'SLS_01_02',
      posX: 1,
      posY: 3,
    },
  ];

  return (
    <section className="flex min-w-120 grow flex-col p-6.25 pt-20">
      <header className="mb-20 pl-5">
        <h1 className="title-large-bold text-grey-900">{title}</h1>
      </header>
      <div className="grid grow grid-cols-3 grid-rows-3 gap-5">
        {/* 가이드라인 */}
        {Array.from({ length: 9 }).map((_, index) => (
          <MiniViewCard
            key={`grid-${index}`}
            posX={(index % 3) + 1}
            posY={Math.floor(index / 3) + 1}
          />
        ))}
        {/* 활성 카드 */}
        {activeCard.map((card) => (
          <MiniViewCard
            key={card.code}
            cardCode={card.code}
            posX={card.posX}
            posY={card.posY}
          />
        ))}
      </div>
    </section>
  );
};
