import type { Menu } from '../admin-menu';

type MenuItem = {
  menuId: Menu['menuId'];
  unitPrice: number;
  quantity: number;
  lineGrossAmount: number; // unitPrice * quantity
};

export type PostOrderRequestDto = {
  grossAmount: number;
  discountAmount: number;
  netAmount: number;
  salesType: 'DINE_IN' | 'DELIVERY' | 'TAKE_OUT';
  orderChannel: 'POS' | 'KIOSK' | 'DELIVERY_APP';
  paymentMethod: 'CARD' | 'CASH' | 'EASY_PAY' | 'ETC';
  menus: MenuItem[];
  orderedAt: string;
};
