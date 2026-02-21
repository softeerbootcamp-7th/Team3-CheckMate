import type { GetDailyReportContentResponseDto } from '@/types/daily-report';

export const DAILY_REPORT_CONTENT_DATA: GetDailyReportContentResponseDto = {
  targetDate: '2024년 03월 15일',
  title: {
    fullText: '오늘은 성과가 뚜렷한 날이에요.',
    highlight: '성과가 뚜렷한',
  },
  statusLabel: '주의',
  kpi: {
    netSales: {
      label: '실매출',
      value: '1,850,000원',
      diffVal: '-18.5%',
      diffDesc: '동요일 대비',
      trendDir: 'down',
    },
    orders: {
      label: '주문건수',
      value: '85건',
      diffVal: '+5.8%',
      diffDesc: '동요일 대비',
      trendDir: 'up',
    },
    aov: {
      label: '객단가',
      value: '21,760원',
      diffVal: '+12.0%',
      diffDesc: '동요일 대비',
      trendDir: 'up',
    },
  },
  insights: [
    {
      idx: 1,
      observe: '점심 피크 매출이 850,000원으로 동요일 대비 +25.0% 늘었어요.',
      meaning:
        '이는 점심 시간대 회전율이 평소보다 빨라졌거나 고단가 주문이 몰렸을 가능성이 있어요.',
      impact:
        '그래서 점심 시간대 인력 배치나 재료 준비량을 늘려야 할지 검토가 필요함을 시사해요.',
    },
    {
      idx: 2,
      observe: '객단가가 21,760원으로 동요일 대비 +12.0% 상승했어요.',
      meaning:
        '이는 세트 메뉴나 사이드 메뉴 추가 주문 비중이 높아졌을 가능성이 있어요.',
      impact:
        '그래서 현재 잘 팔리는 세트 구성을 내일도 적극적으로 노출하면 좋을 것임을 시사해요.',
    },
    {
      idx: 3,
      observe: '취소 건수가 0건으로 동요일 대비 변동이 없었어요.',
      meaning:
        '이는 주방과 홀의 주문 처리 과정이 매우 원활했다는 가능성이 있어요.',
      impact:
        '그래서 현재의 오퍼레이션 방식을 유지하며 직원들을 격려하는 것이 좋음을 시사해요.',
    },
  ],
  strategies: [
    '첫째, 점심 매출 상승세를 이어가기 위해 점심 인기 메뉴의 재고가 충분한지 오늘 소진량과 비교해 확인해봐요.',
    '둘째, 객단가 상승 요인을 파악하기 위해 오늘 가장 많이 팔린 세트 메뉴가 무엇인지 판매 내역을 점검해봐요.',
    '셋째, 바쁜 시간대에도 실수가 없었던 점을 유지하기 위해, 내일 피크 타임 전에도 직원들과 브리핑 시간을 가져요.',
  ],
};
