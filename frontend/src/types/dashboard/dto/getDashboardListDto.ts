interface Dashboard {
  id: number;
  name: string;
  isDefault: boolean;
}
export type GetDashboardListResponseDto = Array<Dashboard>;
