import { SALES_SOURCE } from '@/constants/sales';
import type {
  GetSalesSourceByOrderChannelResponseDto,
  GetSalesSourceByPayMethodResponseDto,
  GetSalesSourceBySalesTypeResponseDto,
} from '@/types/sales';

const salesSourceType = {
  ...SALES_SOURCE.SALE_TYPE,
  ...SALES_SOURCE.ORDER_CHANNEL,
  ...SALES_SOURCE.PAY_METHOD,
} as const;

export const getSalesSourceInsight = <
  T extends
    | GetSalesSourceBySalesTypeResponseDto
    | GetSalesSourceByPayMethodResponseDto
    | GetSalesSourceByOrderChannelResponseDto,
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
