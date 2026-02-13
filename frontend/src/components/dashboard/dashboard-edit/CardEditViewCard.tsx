import { useCallback, useMemo } from 'react';

import { EditCardWrapper } from '@/components/shared';
import {
  DASHBOARD_METRIC_CARDS,
  type MetricCardCode,
} from '@/constants/dashboard';
import { useEditCard } from '@/hooks/dashboard';
import { formatNumber } from '@/utils/shared';

interface CardEditViewCardProps {
  cardCode: MetricCardCode;
}
export const CardEditViewCard = ({ cardCode }: CardEditViewCardProps) => {
  const { addCard, removeCard, cards } = useEditCard();

  const card = useMemo(() => DASHBOARD_METRIC_CARDS[cardCode], [cardCode]);

  const handleAddCard = useCallback(() => {
    addCard(cardCode, card.sizeX, card.sizeY);
  }, [addCard, cardCode, card]);

  const handleDeleteCard = useCallback(() => {
    removeCard(cardCode);
  }, [removeCard, cardCode]);

  const isAdded = useMemo(
    () => cards.some((c) => c.code === cardCode),
    [cards, cardCode],
  );

  if (!card) {
    return null; // 카드 정보가 없는 경우 렌더링하지 않음
  }

  const { code, label, type, period, sizeX, sizeY } = card;

  return (
    <li style={{ gridColumn: `span ${1}` }}>
      <EditCardWrapper
        isAdded={isAdded}
        period={period}
        className="min-w-full"
        sizeX={sizeX}
        sizeY={sizeY}
        onClickAddButton={handleAddCard}
        onClickDeleteButton={handleDeleteCard}
      >
        {label}
        <br />
        {code}
        <br />
        {type}
        <br />
        {sizeX} x {sizeY}
        <div className="flex w-75 flex-col items-start justify-start gap-1">
          <span className="flex items-center gap-1">
            <span className="title-medium-semibold text-grey-900">
              {formatNumber(295600)}
            </span>
            <span className="title-medium-semibold text-grey-900">원</span>
          </span>
          <span className="whitespace-pre">
            {`지난주 월요일\n이 시간보다`}
            <strong className="text-brand-main ml-1">5% 늘었어요</strong>
          </span>
        </div>
      </EditCardWrapper>
    </li>
  );
};
