import { PERIOD_PRESETS } from '@/constants/shared';
import type { SalesIncomeStructureInsight } from '@/types/sales/dashboard-sales-income/salesIncomeStructureInsight';
import { formatNumber, type ValueOf } from '@/utils/shared';

import { createMessageToken, type MessageToken } from '../dashboard';

const DELTA_SHARE_THRESHOLD = 3;

interface GetSalesIncomeStructureComparisonMessageArgs extends Omit<
  SalesIncomeStructureInsight,
  'showDeltaText' | 'showFocusText'
> {
  periodType: ValueOf<typeof PERIOD_PRESETS.dayWeekMonth>;
}

export const getSalesIncomeStructureComparisonMessage = ({
  periodType,
  topType,
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
        `${topType} 비중이 ${deltaShare >= 0 ? '+' : ''}${formatNumber(deltaShare)}%p `,
        true,
        deltaShare >= 0 ? 'primary' : 'negative',
      ),
      createMessageToken('변했어요.'),
    ];
  }

  if (topShare >= 60) {
    return [
      createMessageToken('매출이 '),
      createMessageToken(`${topType}(${formatNumber(topShare)}%)`, true),
      createMessageToken('에 집중돼 있어요.'),
    ];
  }

  return [
    createMessageToken(`${topType}(${formatNumber(topShare)}%) `, true),
    createMessageToken('매출이 가장 많아요.'),
  ];
};
