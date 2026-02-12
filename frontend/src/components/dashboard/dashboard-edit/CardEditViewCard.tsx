import { EditCardWrapper } from '@/components/shared';
import { DASHBOARD_METRIC_CARDS } from '@/constants/dashboard';
import { useEditCard } from '@/hooks/dashboard';

interface CardEditViewCardProps {
  cardCode: string;
}
export const CardEditViewCard = ({ cardCode }: CardEditViewCardProps) => {
  const { addCard, removeCard, cards } = useEditCard();

  const card = DASHBOARD_METRIC_CARDS[cardCode];

  if (!card) {
    return null; // 카드 정보가 없는 경우 렌더링하지 않음
  }

  const { code, label, type, period, sizeX, sizeY } = card;

  const handleAddCard = () => {
    addCard(code, sizeX, sizeY);
  };
  const handleDeleteCard = () => {
    removeCard(code);
  };

  return (
    <li key={cardCode} style={{ gridColumn: `span ${sizeX}` }}>
      <EditCardWrapper
        isAdded={cards.some((c) => c.code === cardCode)}
        period={period as string}
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
