import { useCallback, useMemo } from 'react';

import { EditCardWrapper } from '@/components/shared';
import {
  DASHBOARD_METRIC_CARDS,
  type MetricCardCode,
} from '@/constants/dashboard';
import { useEditCard } from '@/hooks/dashboard';

interface CardEditViewCardProps {
  cardCode: MetricCardCode;
}
export const CardEditViewCard = ({ cardCode }: CardEditViewCardProps) => {
  const { addCard, removeCard, isAdded } = useEditCard();

  const card = useMemo(() => DASHBOARD_METRIC_CARDS[cardCode], [cardCode]);

  const memoisedIsAdded = useMemo(() => isAdded(cardCode), [isAdded, cardCode]);

  const handleAddCard = useCallback(() => {
    addCard(cardCode, card.sizeX, card.sizeY);
  }, [addCard, cardCode, card.sizeX, card.sizeY]);

  const handleDeleteCard = useCallback(() => {
    removeCard(cardCode);
  }, [removeCard, cardCode]);

  if (!card) {
    return null; // 카드 정보가 없는 경우 렌더링하지 않음
  }

  const { code, label, type, period, sizeX, sizeY } = card;

  return (
    <li style={{ gridColumn: `span ${sizeX}` }} onClick={handleAddCard}>
      <EditCardWrapper
        isAdded={memoisedIsAdded}
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
      </EditCardWrapper>
    </li>
  );
};
