import type { CategoryMenu } from '@/types/ingredient';

import { INGREDIENTS_BY_MENU_ID } from './ingredientsByMenuId';

export const CATEGORY_MENUS: CategoryMenu[] = [
  {
    category: '커피',
    menus: [
      {
        menuId: 1,
        name: '아메리카노',
        price: 3000,
        hasIngredients: INGREDIENTS_BY_MENU_ID[1].ingredients.length > 0,
      },
      {
        menuId: 2,
        name: '카페 라떼',
        price: 3800,
        hasIngredients: INGREDIENTS_BY_MENU_ID[2].ingredients.length > 0,
      },
      {
        menuId: 3,
        name: '바닐라 라떼',
        price: 4300,
        hasIngredients: INGREDIENTS_BY_MENU_ID[3].ingredients.length > 0,
      },
    ],
  },
  {
    category: '논커피',
    menus: [
      {
        menuId: 19,
        name: '초코 라떼',
        price: 4200,
        hasIngredients: INGREDIENTS_BY_MENU_ID[19].ingredients.length > 0,
      },
      {
        menuId: 20,
        name: '말차 라떼',
        price: 4500,
        hasIngredients: INGREDIENTS_BY_MENU_ID[20].ingredients.length > 0,
      },
    ],
  },
  {
    category: '디저트',
    menus: [
      {
        menuId: 21,
        name: '치즈 케이크',
        price: 5200,
        hasIngredients: INGREDIENTS_BY_MENU_ID[21].ingredients.length > 0,
      },
      {
        menuId: 22,
        name: '초코 브라우니',
        price: 4800,
        hasIngredients: INGREDIENTS_BY_MENU_ID[22].ingredients.length > 0,
      },
    ],
  },
  {
    category: '주스',
    menus: [
      {
        menuId: 23,
        name: '오렌지 주스',
        price: 5000,
        hasIngredients: INGREDIENTS_BY_MENU_ID[23].ingredients.length > 0,
      },
      {
        menuId: 24,
        name: '자몽 주스',
        price: 5500,
        hasIngredients: INGREDIENTS_BY_MENU_ID[24].ingredients.length > 0,
      },
    ],
  },
  {
    category: '베이커리',
    menus: [
      {
        menuId: 25,
        name: '버터 크루아상',
        price: 3200,
        hasIngredients: INGREDIENTS_BY_MENU_ID[25].ingredients.length > 0,
      },
      {
        menuId: 26,
        name: '초코 머핀',
        price: 3500,
        hasIngredients: INGREDIENTS_BY_MENU_ID[26].ingredients.length > 0,
      },
    ],
  },
];
