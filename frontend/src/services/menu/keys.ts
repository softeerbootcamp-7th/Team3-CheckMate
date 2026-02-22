import type { GetAnalysisDetailQuery } from '@/types/analysis';

export const menuKeys = {
  all: ['menu'] as const,
  list: () => [...menuKeys.all, 'list'] as const,
  // 인기 메뉴 섹션의 공통 쿼리 키
  popularMenu: () => [...menuKeys.all, 'popularMenu'] as const,
  menuSalesRank: (query: GetAnalysisDetailQuery) =>
    [...menuKeys.popularMenu(), 'menuSalesRank', query] as const,
  // 메뉴 판매 패턴 섹션의 공통 쿼리 키
  menuSalesPattern: () => [...menuKeys.all, 'menuSalesPattern'] as const,
  // 식자재 소진량 섹션의 공통 쿼리 키
  ingredientConsumption: () =>
    [...menuKeys.all, 'ingredientConsumption'] as const,
  ingredientConsumptionRank: (query: GetAnalysisDetailQuery) =>
    [
      ...menuKeys.ingredientConsumption(),
      'ingredientConsumptionRank',
      query,
    ] as const,
  // 인기 메뉴 조합 섹션의 공통 쿼리 키
  menuCombination: () => [...menuKeys.all, 'menuCombination'] as const,
  menuCombinationRank: (query: GetAnalysisDetailQuery) =>
    [...menuKeys.menuCombination(), 'menuCombinationRank', query] as const,
};
