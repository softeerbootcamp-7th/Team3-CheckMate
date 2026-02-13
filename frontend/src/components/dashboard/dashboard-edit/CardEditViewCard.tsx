import { EditCardWrapper } from '@/components/shared';
import {
  DASHBOARD_METRIC_CARDS,
  type MetricCardCode,
} from '@/constants/dashboard';
import { formatNumber } from '@/utils/shared';

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
        //innerClassName="items-start"
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
