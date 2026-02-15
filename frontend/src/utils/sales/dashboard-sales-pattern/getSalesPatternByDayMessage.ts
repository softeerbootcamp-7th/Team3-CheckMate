import type { SalesByDaySummary } from '@/types/sales';

import {
  createMessageToken,
  type MessageToken,
} from '../dashboard/createMessageToken';

interface GetSalesPatternByDayMessageArgs {
  topDay: SalesByDaySummary['topDay'];
  isSignificant: boolean;
}

export const getSalesPatternByDayMessage = ({
  topDay,
  isSignificant,
}: GetSalesPatternByDayMessageArgs): MessageToken[] => {
  if (isSignificant) {
    return [
      createMessageToken(`${topDay}요일`, true, 'primary'),
      createMessageToken('이 다른 요일보다 확실히 매출이 높아요.'),
    ];
  }

  return [
    createMessageToken('최근 4주 기준 '),
    createMessageToken(`${topDay}요일`, true, 'primary'),
  ];
};
