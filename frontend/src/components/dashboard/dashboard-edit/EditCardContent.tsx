import {
  AveragePriceContent,
  OrderCountContent,
  OrderMethodContent,
  PaymentMethodContent,
  PeakTimeContent,
  RealSalesContent,
  SalesByDayContent,
  SalesTypeContent,
} from '@/components/sales';
import type { MetricCardCode } from '@/constants/dashboard';

interface EditCardContentProps {
  cardCode: MetricCardCode;
}

export const EditCardContent = ({ cardCode }: EditCardContentProps) => {
  switch (cardCode) {
    case 'SLS_01_01':
    case 'SLS_01_02':
    case 'SLS_01_03':
      return <RealSalesContent cardCode={cardCode} />;
    case 'SLS_02_01':
    case 'SLS_02_02':
    case 'SLS_02_03':
      return <OrderCountContent cardCode={cardCode} />;
    case 'SLS_03_01':
    case 'SLS_03_02':
    case 'SLS_03_03':
      return <AveragePriceContent cardCode={cardCode} />;
    case 'SLS_06_01':
    case 'SLS_06_02':
    case 'SLS_06_03':
      return <SalesTypeContent cardCode={cardCode} />;
    case 'SLS_07_01':
    case 'SLS_07_02':
    case 'SLS_07_03':
      return <OrderMethodContent cardCode={cardCode} />;
    case 'SLS_08_01':
    case 'SLS_08_02':
    case 'SLS_08_03':
      return <PaymentMethodContent cardCode={cardCode} />;
    case 'SLS_13_01':
      return <PeakTimeContent />;
    case 'SLS_14_06':
      return <SalesByDayContent />;
    default:
      return null;
  }
};
