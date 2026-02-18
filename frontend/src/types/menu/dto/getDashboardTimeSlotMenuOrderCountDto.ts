// MNU_03 – 시간대별 메뉴 주문건수 카드
// 대시보드 용 응답 DTO
// GetDashboardTimeSlotMenuOrderCountDto 예시
// {"timeSlot2H":10,"menuName":"불고기 버거"}

export interface GetDashboardTimeSlotMenuOrderCountResponseDto {
  timeSlot2H: number;
  menuName: string;
}
