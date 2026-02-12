import { EditCardWrapper } from '@/components/shared';
import { DASHBOARD_METRIC_CARDS } from '@/constants/dashboard';

interface CardEditViewCardProps {
  cardCode: string;
}
export const CardEditViewCard = ({ cardCode }: CardEditViewCardProps) => {
  const card = DASHBOARD_METRIC_CARDS[cardCode];

  if (!card) {
    return null; // 카드 정보가 없는 경우 렌더링하지 않음
  }

  const { code, label, type, period, sizeX, sizeY } = card;

  return (
    <li key={cardCode} style={{ gridColumn: `span ${sizeX}` }}>
      <EditCardWrapper
        isAdded={false}
        period={period as string}
        className="min-w-full"
        sizeX={sizeX}
        sizeY={sizeY}
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
