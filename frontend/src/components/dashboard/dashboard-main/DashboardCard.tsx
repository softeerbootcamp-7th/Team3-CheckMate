import type { MetricCardCode } from '@/constants/dashboard';

import {
  DashboardIngredientUsageRankingCard,
  DashboardMenuSalesRankingCard,
  DashboardPopularMenuCombinationCard,
  DashboardTimeSlotMenuOrderCountCard,
} from '../dashboard-menu';
import {
  DashboardAveragePriceCard,
  DashboardIncomeStructureOrderMethodCard,
  DashboardIncomeStructurePaymentMethodCard,
  DashboardIncomeStructureSalesTypeCard,
  DashboardOrderCountCard,
  DashboardPeakTimeCard,
  DashboardRealSalesCard,
  DashboardSalesByDayCard,
  DashboardSalesTrendCard,
} from '../dashboard-sales';

export const DashboardCard = ({ cardCode }: { cardCode: MetricCardCode }) => {
  switch (cardCode) {
    case 'SLS_01_01':
    case 'SLS_01_02':
    case 'SLS_01_03':
      return <DashboardRealSalesCard cardCode={cardCode} />;
    case 'SLS_02_01':
    case 'SLS_02_02':
    case 'SLS_02_03':
      return <DashboardOrderCountCard cardCode={cardCode} />;
    case 'SLS_03_01':
    case 'SLS_03_02':
    case 'SLS_03_03':
      return <DashboardAveragePriceCard cardCode={cardCode} />;
    case 'SLS_06_01':
    case 'SLS_06_02':
    case 'SLS_06_03':
      return <DashboardIncomeStructureSalesTypeCard cardCode={cardCode} />;
    case 'SLS_07_01':
    case 'SLS_07_02':
    case 'SLS_07_03':
      return <DashboardIncomeStructureOrderMethodCard cardCode={cardCode} />;
    case 'SLS_08_01':
    case 'SLS_08_02':
    case 'SLS_08_03':
      return <DashboardIncomeStructurePaymentMethodCard cardCode={cardCode} />;
    case 'SLS_09_04':
    case 'SLS_10_07':
    case 'SLS_11_07':
      return <DashboardSalesTrendCard cardCode={cardCode} />;
    case 'SLS_13_01':
      return <DashboardPeakTimeCard cardCode={cardCode} />;
    case 'SLS_14_06':
      return <DashboardSalesByDayCard cardCode={cardCode} />;
    case 'MNU_01_01':
    case 'MNU_01_04':
    case 'MNU_01_05':
      return <DashboardMenuSalesRankingCard cardCode={cardCode} />;
    case 'MNU_03_01':
      return <DashboardTimeSlotMenuOrderCountCard cardCode={cardCode} />;
    case 'MNU_04_01':
      return <DashboardIngredientUsageRankingCard cardCode={cardCode} />;
    case 'MNU_05_04':
      return <DashboardPopularMenuCombinationCard cardCode={cardCode} />;
    default:
      return null;
  }
};
