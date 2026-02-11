import type { MenuInfo } from '../MenuInfo';

// pos기로 연동된, 매장의 등록된 메뉴 목록 조회 DTO
export interface GetRegisteredMenusDto {
  menus: MenuInfo[];
}
