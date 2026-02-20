import { useCallback, useMemo } from 'react';

import { EditCardWrapper } from '@/components/shared';
import {
  DASHBOARD_EDIT_AREA,
  DASHBOARD_METRIC_CARDS,
  type MetricCardCode,
} from '@/constants/dashboard';
import { useDragAndDropCard, useEditCard } from '@/hooks/dashboard';

import { EditCardContent } from './EditCardContent';

interface CardEditViewCardProps {
  cardCode: MetricCardCode;
}

export const CardEditViewCard = ({ cardCode }: CardEditViewCardProps) => {
  const { addCard, removeCard, isAdded } = useEditCard();
  const { handleDragStart, handleDragEnd } = useDragAndDropCard();

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

  const { period, sizeX, sizeY } = card;

  return (
    <li
      style={{ gridColumn: `span ${sizeX}` }}
      draggable={!memoisedIsAdded}
      onDragStart={(e) =>
        handleDragStart(e, DASHBOARD_EDIT_AREA.LIST, {
          cardCode,
          colNo: -1,
          rowNo: -1,
        })
      }
      onDragEnd={handleDragEnd}
      className="translate-x-0 cursor-grab active:cursor-grabbing"
      onClick={!memoisedIsAdded ? handleAddCard : undefined}
    >
      <EditCardWrapper
        isAdded={memoisedIsAdded}
        period={period}
        className="min-w-full"
        sizeX={sizeX}
        sizeY={sizeY}
        onClickAddButton={handleAddCard}
        onClickDeleteButton={handleDeleteCard}
      >
        <EditCardContent cardCode={cardCode} />
      </EditCardWrapper>
    </li>
  );
};
