import type { GetMenuIngredientsResponseDto } from '@/types/ingredient';

export const INGREDIENTS_BY_MENU_ID: Record<
  number,
  GetMenuIngredientsResponseDto
> = {
  1: {
    menuName: '아메리카노',
    ingredients: [
      { name: '원두', quantity: 18, unit: 'G' },
      { name: '물', quantity: 250, unit: 'ML' },
    ],
  },
  2: {
    menuName: '카페 라떼',
    ingredients: [
      { name: '원두', quantity: 18, unit: 'G' },
      { name: '우유', quantity: 200, unit: 'ML' },
    ],
  },
  3: {
    menuName: '바닐라 라떼',
    ingredients: [{ name: '바닐라 시럽', quantity: 15, unit: 'ML' }],
  },

  19: {
    menuName: '초코 라떼',
    ingredients: [
      { name: '우유', quantity: 200, unit: 'ML' },
      { name: '초코 파우더', quantity: 25, unit: 'G' },
      { name: '설탕', quantity: 5, unit: 'G' },
    ],
  },
  20: {
    menuName: '말차 라떼',
    ingredients: [
      { name: '우유', quantity: 200, unit: 'ML' },
      { name: '말차 파우더', quantity: 10, unit: 'G' },
      { name: '시럽', quantity: 15, unit: 'ML' },
    ],
  },
  21: {
    menuName: '치즈 케이크',
    ingredients: [
      { name: '크림치즈', quantity: 120, unit: 'G' },
      { name: '설탕', quantity: 20, unit: 'G' },
      { name: '생크림', quantity: 60, unit: 'ML' },
    ],
  },
  22: {
    menuName: '초코 브라우니',
    ingredients: [
      { name: '밀가루', quantity: 80, unit: 'G' },
      { name: '코코아 파우더', quantity: 25, unit: 'G' },
      { name: '버터', quantity: 60, unit: 'G' },
    ],
  },
  23: {
    menuName: '오렌지 주스',
    ingredients: [{ name: '오렌지', quantity: 200, unit: 'G' }],
  },
  24: {
    menuName: '자몽 주스',
    ingredients: [],
  },
  25: {
    menuName: '버터 크루아상',
    ingredients: [
      { name: '밀가루', quantity: 120, unit: 'G' },
      { name: '버터', quantity: 40, unit: 'G' },
      { name: '우유', quantity: 30, unit: 'ML' },
    ],
  },
  26: {
    menuName: '초코 머핀',
    ingredients: [
      { name: '밀가루', quantity: 100, unit: 'G' },
      { name: '코코아 파우더', quantity: 15, unit: 'G' },
      { name: '우유', quantity: 60, unit: 'ML' },
    ],
  },
};
