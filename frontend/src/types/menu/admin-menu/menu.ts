export interface Menu {
  menuId: number;
  name: string;
  price: number;
}

export interface MenuCategory {
  category: string;
  menus: Menu[];
}
