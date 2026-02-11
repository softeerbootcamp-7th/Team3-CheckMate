export const ingredientKeys = {
  all: ['ingredient'] as const,
  registeredMenus: () => [...ingredientKeys.all, 'registeredMenus'] as const,
};
