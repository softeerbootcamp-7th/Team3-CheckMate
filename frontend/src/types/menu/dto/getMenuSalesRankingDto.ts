// MenuSales 예시
// {
//       "menuName": "불고기 버거",
//       "totalSalesAmount": 1500000,
//       "orderCount": 120
//     },

export interface MenuSales {
  menuName: string;
  totalSalesAmount: number;
  orderCount: number;
}

// 백엔드에서 보내주는 메뉴별 매출, 주문건 수 DTO -> 매출별 랭킹에 사용
export interface GetMenuSalesRankingResponseDto {
  items: MenuSales[];
}
