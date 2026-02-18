import {
  IngredientUsageRankingCardContent,
  MenuSalesRankingCardContent,
  PopularMenuCombinationCardContent,
  TimeSlotMenuOrderCountCardContent,
} from '@/components/menu';
import {
  AveragePriceContent,
  OrderCountContent,
  OrderMethodContent,
  PaymentMethodContent,
  PeakTimeContent,
  RealSalesContent,
  SalesByDayContent,
  SalesTrendContent,
  SalesTypeContent,
} from '@/components/sales';
import type { MetricCardCode } from '@/constants/dashboard';
import {
  INGREDIENT_USAGE_RANKING,
  MENU_SALES_RANKING,
  ORDER_COUNT as MENU_ORDER_COUNT,
  POPULAR_MENU_COMBINATION,
} from '@/constants/menu';
import {
  AVERAGE_PRICE,
  ORDER_COUNT,
  ORDER_METHOD,
  PAYMENT_METHOD,
  PEAK_TIME,
  REAL_SALES,
  SALES_BY_DAY,
  SALES_TREND,
  SALES_TYPE,
} from '@/constants/sales';

interface EditCardContentProps {
  cardCode: MetricCardCode;
}

const {
  EXAMPLE_AMOUNT: REAL_SALES_EXAMPLE_AMOUNT,
  EXAMPLE_CHANGE_RATE: REAL_SALES_EXAMPLE_CHANGE_RATE,
  EXAMPLE_HAS_PREVIOUS_DATA: REAL_SALES_EXAMPLE_HAS_PREVIOUS_DATA,
} = REAL_SALES;
const {
  EXAMPLE_AMOUNT: ORDER_COUNT_EXAMPLE_AMOUNT,
  EXAMPLE_CHANGE_RATE: ORDER_COUNT_EXAMPLE_CHANGE_RATE,
  EXAMPLE_HAS_PREVIOUS_DATA: ORDER_COUNT_EXAMPLE_HAS_PREVIOUS_DATA,
} = ORDER_COUNT;
const {
  EXAMPLE_AMOUNT: AVERAGE_PRICE_EXAMPLE_AMOUNT,
  EXAMPLE_COMPARISON_AMOUNT: AVERAGE_PRICE_EXAMPLE_COMPARISON_AMOUNT,
  EXAMPLE_HAS_PREVIOUS_DATA: AVERAGE_PRICE_EXAMPLE_HAS_PREVIOUS_DATA,
} = AVERAGE_PRICE;
const {
  EXAMPLE_TOP_TYPE: SALES_TYPE_EXAMPLE_TOP_TYPE,
  EXAMPLE_TOP_SHARE: SALES_TYPE_EXAMPLE_TOP_SHARE,
  EXAMPLE_DELTA_SHARE: SALES_TYPE_EXAMPLE_DELTA_SHARE,
  EXAMPLE_SALES_SOURCE_DATA: SALES_TYPE_EXAMPLE_SALES_SOURCE_DATA,
} = SALES_TYPE;
const {
  EXAMPLE_TOP_TYPE: ORDER_METHOD_EXAMPLE_TOP_TYPE,
  EXAMPLE_TOP_SHARE: ORDER_METHOD_EXAMPLE_TOP_SHARE,
  EXAMPLE_DELTA_SHARE: ORDER_METHOD_EXAMPLE_DELTA_SHARE,
  EXAMPLE_ORDER_METHOD_DATA: ORDER_METHOD_EXAMPLE_ORDER_METHOD_DATA,
} = ORDER_METHOD;
const {
  EXAMPLE_TOP_TYPE: PAYMENT_METHOD_EXAMPLE_TOP_TYPE,
  EXAMPLE_TOP_SHARE: PAYMENT_METHOD_EXAMPLE_TOP_SHARE,
  EXAMPLE_DELTA_SHARE: PAYMENT_METHOD_EXAMPLE_DELTA_SHARE,
  EXAMPLE_PAYMENT_METHOD_DATA: PAYMENT_METHOD_EXAMPLE_PAYMENT_METHOD_DATA,
} = PAYMENT_METHOD;
const { EXAMPLE_DATA: PEAK_TIME_EXAMPLE_DATA } = PEAK_TIME;
const {
  EXAMPLE_DATA: SALES_BY_DAY_EXAMPLE_DATA,
  EXAMPLE_TOP_DAY: SALES_BY_DAY_EXAMPLE_TOP_DAY,
  EXAMPLE_IS_SIGNIFICANT: SALES_BY_DAY_EXAMPLE_IS_SIGNIFICANT,
} = SALES_BY_DAY;
const { EXAMPLE_DATA: SALES_TREND_EXAMPLE_DATA } = SALES_TREND;
const { EXAMPLE_HAS_INGREDIENT, EXAMPLE_INGREDIENT_USAGE_RANKING_ITEMS } =
  INGREDIENT_USAGE_RANKING;
const { EXAMPLE_MENU_SALES_RANKING_ITEMS } = MENU_SALES_RANKING;
const { EXAMPLE_TIME_SLOT_2H, EXAMPLE_MENU_NAME } = MENU_ORDER_COUNT;
const { EXAMPLE_FIRST_MENU_NAME, EXAMPLE_SECOND_MENU_NAME } =
  POPULAR_MENU_COMBINATION;

export const EditCardContent = ({ cardCode }: EditCardContentProps) => {
  switch (cardCode) {
    case 'SLS_01_01':
    case 'SLS_01_02':
    case 'SLS_01_03':
      return (
        <RealSalesContent
          cardCode={cardCode}
          netAmount={REAL_SALES_EXAMPLE_AMOUNT}
          changeRate={REAL_SALES_EXAMPLE_CHANGE_RATE}
          hasPreviousData={REAL_SALES_EXAMPLE_HAS_PREVIOUS_DATA}
        />
      );
    case 'SLS_02_01':
    case 'SLS_02_02':
    case 'SLS_02_03':
      return (
        <OrderCountContent
          cardCode={cardCode}
          orderCount={ORDER_COUNT_EXAMPLE_AMOUNT}
          changeRate={ORDER_COUNT_EXAMPLE_CHANGE_RATE}
          hasPreviousData={ORDER_COUNT_EXAMPLE_HAS_PREVIOUS_DATA}
        />
      );
    case 'SLS_03_01':
    case 'SLS_03_02':
    case 'SLS_03_03':
      return (
        <AveragePriceContent
          cardCode={cardCode}
          averageOrderAmount={AVERAGE_PRICE_EXAMPLE_AMOUNT}
          differenceAmount={AVERAGE_PRICE_EXAMPLE_COMPARISON_AMOUNT}
          hasPreviousData={AVERAGE_PRICE_EXAMPLE_HAS_PREVIOUS_DATA}
        />
      );
    case 'SLS_06_01':
    case 'SLS_06_02':
    case 'SLS_06_03':
      return (
        <SalesTypeContent
          cardCode={cardCode}
          insight={{
            topType: SALES_TYPE_EXAMPLE_TOP_TYPE,
            topShare: SALES_TYPE_EXAMPLE_TOP_SHARE,
            deltaShare: SALES_TYPE_EXAMPLE_DELTA_SHARE,
          }}
          items={SALES_TYPE_EXAMPLE_SALES_SOURCE_DATA}
        />
      );
    case 'SLS_07_01':
    case 'SLS_07_02':
    case 'SLS_07_03':
      return (
        <OrderMethodContent
          cardCode={cardCode}
          insight={{
            topType: ORDER_METHOD_EXAMPLE_TOP_TYPE,
            topShare: ORDER_METHOD_EXAMPLE_TOP_SHARE,
            deltaShare: ORDER_METHOD_EXAMPLE_DELTA_SHARE,
          }}
          items={ORDER_METHOD_EXAMPLE_ORDER_METHOD_DATA}
        />
      );
    case 'SLS_08_01':
    case 'SLS_08_02':
    case 'SLS_08_03':
      return (
        <PaymentMethodContent
          cardCode={cardCode}
          insight={{
            topType: PAYMENT_METHOD_EXAMPLE_TOP_TYPE,
            topShare: PAYMENT_METHOD_EXAMPLE_TOP_SHARE,
            deltaShare: PAYMENT_METHOD_EXAMPLE_DELTA_SHARE,
          }}
          items={PAYMENT_METHOD_EXAMPLE_PAYMENT_METHOD_DATA}
        />
      );
    case 'SLS_09_04':
    case 'SLS_10_07':
    case 'SLS_11_07':
      return (
        <SalesTrendContent
          cardCode={cardCode}
          salesTrendData={SALES_TREND_EXAMPLE_DATA[cardCode]}
        />
      );
    case 'SLS_13_01':
      return <PeakTimeContent peakTimeData={PEAK_TIME_EXAMPLE_DATA} />;
    case 'SLS_14_06':
      return (
        <SalesByDayContent
          salesByDayItems={SALES_BY_DAY_EXAMPLE_DATA}
          topDay={SALES_BY_DAY_EXAMPLE_TOP_DAY}
          isSignificant={SALES_BY_DAY_EXAMPLE_IS_SIGNIFICANT}
        />
      );
    case 'MNU_01_01':
    case 'MNU_01_04':
    case 'MNU_01_05':
      return (
        <MenuSalesRankingCardContent items={EXAMPLE_MENU_SALES_RANKING_ITEMS} />
      );
    case 'MNU_03_01':
      return (
        <TimeSlotMenuOrderCountCardContent
          timeSlot2H={EXAMPLE_TIME_SLOT_2H}
          menuName={EXAMPLE_MENU_NAME}
        />
      );
    case 'MNU_04_01':
      return (
        <IngredientUsageRankingCardContent
          hasIngredient={EXAMPLE_HAS_INGREDIENT}
          items={EXAMPLE_INGREDIENT_USAGE_RANKING_ITEMS}
        />
      );
    case 'MNU_05_04':
      return (
        <PopularMenuCombinationCardContent
          firstMenuName={EXAMPLE_FIRST_MENU_NAME}
          secondMenuName={EXAMPLE_SECOND_MENU_NAME}
        />
      );
    default:
      return null;
  }
};
