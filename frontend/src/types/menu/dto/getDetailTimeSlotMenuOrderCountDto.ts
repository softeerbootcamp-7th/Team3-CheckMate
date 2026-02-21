interface TimeSlotMenuOrderCountItem {
  menuName: string;
  orderCount: number;
}

interface TimeSlotMenuGroupItem {
  timeSlot2H: number;
  totalOrderCount: number;
  menus: TimeSlotMenuOrderCountItem[];
}

export interface GetDetailTimeSlotMenuOrderCountResponseDto {
  items: TimeSlotMenuGroupItem[];
}
