export const ingredientKeys = {
  all: ['ingredient'] as const,
  registeredMenus: () => [...ingredientKeys.all, 'registeredMenus'] as const,
  // 각 메뉴 별 등록된 식자재 조회 키
  menuIngredients: (menuId: number) =>
    [...ingredientKeys.all, 'menuIngredients', `menuId_${menuId}`] as const,
};
