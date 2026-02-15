import {
  AveragePriceContent,
  OrderCountContent,
  OrderMethodContent,
  RealSalesContent,
  SalesTypeContent,
} from '@/components/sales';
import { PaymentMethodContent } from '@/components/sales/dashboard-sales-income/PaymentMethodContent';
import { PeakTimeContent } from '@/components/sales/dashboard-sales-pattern/PeakTimeContent';
import { SalesByDayContent } from '@/components/sales/dashboard-sales-pattern/SalesByDayContent';
import { EditCardWrapper } from '@/components/shared';
import {
  DASHBOARD_METRIC_CARDS,
  type MetricCardCode,
} from '@/constants/dashboard';

const EditCardContent = ({ code }: { code: MetricCardCode }) => {
  switch (code) {
    case 'SLS_01_01':
    case 'SLS_01_02':
    case 'SLS_01_03':
      return <RealSalesContent cardCode={code} />;
    case 'SLS_02_01':
    case 'SLS_02_02':
    case 'SLS_02_03':
      return <OrderCountContent cardCode={code} />;
    case 'SLS_03_01':
    case 'SLS_03_02':
    case 'SLS_03_03':
      return <AveragePriceContent cardCode={code} />;
    case 'SLS_06_01':
    case 'SLS_06_02':
    case 'SLS_06_03':
      return <SalesTypeContent cardCode={code} />;
    case 'SLS_07_01':
    case 'SLS_07_02':
    case 'SLS_07_03':
      return <OrderMethodContent cardCode={code} />;
    case 'SLS_08_01':
    case 'SLS_08_02':
    case 'SLS_08_03':
      return <PaymentMethodContent cardCode={code} />;

    case 'SLS_13_01':
      return <PeakTimeContent />;
    case 'SLS_14_06':
      return <SalesByDayContent />;
    default:
      return <></>;
  }
};

interface CardEditViewCardProps {
  cardCode: MetricCardCode;
}

export const CardEditViewCard = ({ cardCode }: CardEditViewCardProps) => {
  const card = DASHBOARD_METRIC_CARDS[cardCode];

  if (!card) {
    return null; // 카드 정보가 없는 경우 렌더링하지 않음
  }

  const { code, period, sizeX } = card;

  return (
    <li key={cardCode} style={{ gridColumn: `span ${sizeX}` }}>
      <EditCardWrapper
        isAdded={false}
        period={period as string}
        className="min-w-full"
        sizeX={sizeX}
        innerClassName="items-start"
      >
        <EditCardContent code={code} />
      </EditCardWrapper>
    </li>
  );
};
