import { SALES_SOURCE } from '@/constants/sales';
import type {
  GetIncomeStructureByOrderChannelResponseDto,
  GetIncomeStructureByPaymentMethodResponseDto,
  GetIncomeStructureBySalesTypeResponseDto,
} from '@/types/sales';

const salesSourceType = {
  ...SALES_SOURCE.SALE_TYPE,
  ...SALES_SOURCE.ORDER_METHOD,
  ...SALES_SOURCE.PAYMENT_METHOD,
} as const;

export const getSalesIncomeStructureInsight = <
  T extends
    | GetIncomeStructureBySalesTypeResponseDto
    | GetIncomeStructureByPaymentMethodResponseDto
    | GetIncomeStructureByOrderChannelResponseDto,
>(
  insight: T['insight'],
  items: T['items'],
) => {
  const {
    salesAmount: _salesAmount,
    orderCount: _orderCount,
    share,
    deltaShare,
    ...rest
  } = items[0];

  const topType = insight?.topType ?? Object.values(rest)[0];
  const topShare = insight?.topShare ?? share;
  const topDeltaShare = insight?.deltaShare ?? deltaShare;

  const topTypeLabel = salesSourceType[topType];

  return {
    topType,
    topShare,
    topDeltaShare,
    topTypeLabel,
  };
};
