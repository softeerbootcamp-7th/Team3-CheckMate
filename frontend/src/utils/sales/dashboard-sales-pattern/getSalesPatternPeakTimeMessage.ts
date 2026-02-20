import type { GetDashboardPeakTimeResponseDto } from '@/types/sales';

import { createMessageToken, type MessageToken } from '../dashboard';

interface GetSalesPatternPeakTimeMessageArgs {
  todayPeak: GetDashboardPeakTimeResponseDto['todayPeak'];
  comparisonPeak: GetDashboardPeakTimeResponseDto['comparisonPeak'];
  beforeComparisonPeak: GetDashboardPeakTimeResponseDto['beforeComparisonPeak'];
}

export const getSalesPatternPeakTimeMessage = ({
  todayPeak,
  comparisonPeak,
  beforeComparisonPeak,
}: GetSalesPatternPeakTimeMessageArgs): MessageToken[] => {
  if (!todayPeak || !comparisonPeak) {
    return [
      createMessageToken('데이터가 더 쌓이면 '),
      createMessageToken('가장 바쁜 시간', true, 'primary'),
      createMessageToken('을 알려드릴게요.'),
    ];
  }

  if (beforeComparisonPeak) {
    return [
      createMessageToken('오늘은 '),
      createMessageToken(`${comparisonPeak}시대가 피크타임`, true, 'primary'),
      createMessageToken('으로 예상돼요.'),
    ];
  }

  return [
    createMessageToken('지금까지 주문이 가장 몰린 시간은 '),
    createMessageToken(`${todayPeak}시대`, true, 'primary'),
    createMessageToken('예요.'),
  ];
};
