import { EditCardWrapper } from '@/components/shared';
import {
  DASHBOARD_METRIC_CARDS,
  type MetricCardCode,
} from '@/constants/dashboard';

import { RealSalesCardContent } from '../sales/RealSalesCardContent';

interface CardEditViewCardProps {
  cardCode: MetricCardCode;
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
        innerClassName="items-start m-0!"
      >
        {label}
        <br />
        {code}
        <br />
        {type}
        <br />
        {sizeX} x {sizeY}
        {(code === 'SLS_01_01' ||
          code === 'SLS_01_02' ||
          code === 'SLS_01_03') && <RealSalesCardContent cardCode={code} />}
      </EditCardWrapper>
    </li>
  );
};
