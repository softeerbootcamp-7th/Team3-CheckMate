// MNU_05 – 인기 메뉴 조합 카드
// 대시보드 용 응답 DTO

// GetDashboardPopularMenuCombinationResponseDto 예시
// {
//   "firstMenuName": "불고기 버거",
//   "secondMenuName": "감자튀김"
// }

export interface GetDashboardPopularMenuCombinationResponseDto {
  firstMenuName: string;
  secondMenuName: string;
}
