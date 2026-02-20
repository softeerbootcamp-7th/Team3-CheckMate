import type { SALES_SOURCE, SalesSourceType } from '@/constants/sales';
import { PERIOD_PRESETS } from '@/constants/shared';
import type { SalesIncomeStructureInsight } from '@/types/sales/dashboard-sales-income/salesIncomeStructureInsight';
import { formatNumber, type ValueOf } from '@/utils/shared';

import { createMessageToken, type MessageToken } from '../dashboard';

const DELTA_SHARE_THRESHOLD = 3;

interface GetSalesIncomeStructureComparisonMessageArgs extends Omit<
  SalesIncomeStructureInsight<keyof typeof SALES_SOURCE>,
  'showDeltaText' | 'showFocusText' | 'topType'
> {
  periodType: ValueOf<typeof PERIOD_PRESETS.dayWeekMonth>;
  topTypeLabel: SalesSourceType;
}

export const getSalesIncomeStructureComparisonMessage = ({
  periodType,
  topTypeLabel,
  topShare,
  deltaShare,
}: GetSalesIncomeStructureComparisonMessageArgs): MessageToken[] => {
  if (
    periodType === PERIOD_PRESETS.dayWeekMonth.today &&
    Math.abs(deltaShare) >= DELTA_SHARE_THRESHOLD
  ) {
    return [
      createMessageToken('최근 7일 대비 '),
      createMessageToken(
        `${topTypeLabel} 비중이 ${deltaShare >= 0 ? '+' : ''}${formatNumber(deltaShare)}%p `,
        true,
        deltaShare >= 0 ? 'primary' : 'negative',
      ),
      createMessageToken('변했어요.'),
    ];
  }

  if (topShare >= 60) {
    return [
      createMessageToken('매출이 '),
      createMessageToken(`${topTypeLabel}(${formatNumber(topShare)}%)`, true),
      createMessageToken('에 집중돼 있어요.'),
    ];
  }

  return [
    createMessageToken(`${topTypeLabel}(${formatNumber(topShare)}%) `, true),
    createMessageToken('매출이 가장 많아요.'),
  ];
};
