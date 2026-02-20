export interface MenuInfo {
  menuId: number;
  name: string;
  price: number;
  hasIngredients: boolean;
}

// 각 카테고리별 등록된 메뉴
export interface CategoryMenu {
  category: string;
  menus: MenuInfo[];
}
