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
  if (!topDay) {
    return [
      createMessageToken('데이터가 더 쌓이면 '),
      createMessageToken('가장 매출이 높은 요일', true, 'primary'),
      createMessageToken('을 알려드릴게요.'),
    ];
  }

  if (isSignificant) {
    return [
      createMessageToken(`${topDay}요일`, true, 'primary'),
      createMessageToken('이 다른 요일보다 확실히 매출이 높아요.'),
    ];
  }

  return [
    createMessageToken('최근 4주 기준 '),
    createMessageToken(`${topDay}요일 매출`, true, 'primary'),
    createMessageToken('이 가장 좋아요.'),
  ];
};
