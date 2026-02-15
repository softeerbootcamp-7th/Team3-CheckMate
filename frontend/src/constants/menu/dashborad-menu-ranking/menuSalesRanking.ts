// 편집 패널에서 보여질 데이터 -> 메뉴별 매출 랭킹 카드
export const MENU_SALES_RANKING = {
  EXAMPLE_ITEMS: [
    {
      menuName: '아메리카노(ICE)',
      totalSalesAmount: 1500000,
      orderCount: 120,
    },
    {
      menuName: '카페라떼(HOT)',
      totalSalesAmount: 1200000,
      orderCount: 100,
    },
    {
      menuName: '카페모카(ICE)',
      totalSalesAmount: 900000,
      orderCount: 80,
    },
    {
      menuName: '바닐라 라떼(HOT)',
      totalSalesAmount: 600000,
      orderCount: 60,
    },
    {
      menuName: '카라멜 마끼아또(ICE)',
      totalSalesAmount: 400000,
      orderCount: 90,
    },
  ],
} as const;
