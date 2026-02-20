import type { CategoryMenu } from '@/types/ingredient';

export const CATEGORY_MENUS: CategoryMenu[] = [
  {
    category: '커피',
    menus: [
      { menuId: 1, name: '아메리카노', price: 3000, hasIngredients: true },
      { menuId: 2, name: '카페 라떼', price: 3800, hasIngredients: true },
      { menuId: 3, name: '바닐라 라떼', price: 4300, hasIngredients: false },
      { menuId: 4, name: '아메리카노', price: 3000, hasIngredients: true },
      { menuId: 5, name: '카페 라떼', price: 3800, hasIngredients: true },
      { menuId: 6, name: '바닐라 라떼', price: 4300, hasIngredients: false },
      { menuId: 7, name: '아메리카노', price: 3000, hasIngredients: true },
      { menuId: 8, name: '카페 라떼', price: 3800, hasIngredients: true },
      { menuId: 9, name: '바닐라 라떼', price: 4300, hasIngredients: false },
      { menuId: 10, name: '아메리카노', price: 3000, hasIngredients: true },
      { menuId: 11, name: '카페 라떼', price: 3800, hasIngredients: true },
      { menuId: 12, name: '바닐라 라떼', price: 4300, hasIngredients: false },
      { menuId: 13, name: '아메리카노', price: 3000, hasIngredients: true },
      { menuId: 14, name: '카페 라떼', price: 3800, hasIngredients: true },
      { menuId: 15, name: '바닐라 라떼', price: 4300, hasIngredients: false },
      { menuId: 16, name: '아메리카노', price: 3000, hasIngredients: true },
      { menuId: 17, name: '카페 라떼', price: 3800, hasIngredients: true },
      { menuId: 18, name: '바닐라 라떼', price: 4300, hasIngredients: false },
    ],
  },
  {
    category: '논커피',
    menus: [
      { menuId: 19, name: '초코 라떼', price: 4200, hasIngredients: true },
      { menuId: 20, name: '말차 라떼', price: 4500, hasIngredients: true },
    ],
  },
  {
    category: '디저트',
    menus: [
      { menuId: 21, name: '치즈 케이크', price: 5200, hasIngredients: true },
      { menuId: 22, name: '초코 브라우니', price: 4800, hasIngredients: true },
    ],
  },
  {
    category: '주스',
    menus: [
      { menuId: 23, name: '오렌지 주스', price: 5000, hasIngredients: true },
      { menuId: 24, name: '자몽 주스', price: 5500, hasIngredients: false },
    ],
  },
  {
    category: '베이커리',
    menus: [
      { menuId: 25, name: '버터 크루아상', price: 3200, hasIngredients: true },
      { menuId: 26, name: '초코 머핀', price: 3500, hasIngredients: true },
    ],
  },
];
