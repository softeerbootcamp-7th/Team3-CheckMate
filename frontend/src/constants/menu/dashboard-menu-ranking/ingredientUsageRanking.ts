import type { GetIngredientUsageRankingResponseDto } from '@/types/menu/dto';

// 편집 패널에서 보여질 데이터 -> 메뉴별 매출 랭킹 카드
export const INGREDIENT_USAGE_RANKING = {
  EXAMPLE_HAS_INGREDIENT: true,
  EXAMPLE_INGREDIENT_USAGE_RANKING_ITEMS: [
    {
      ingredientName: '우유',
      totalQuantity: 3921,
      baseUnit: 'ml',
    },
    {
      ingredientName: '케냐산 원두',
      totalQuantity: 1200,
      baseUnit: 'g',
    },
    {
      ingredientName: '생딸기',
      totalQuantity: 840,
      baseUnit: 'g',
    },
    {
      ingredientName: '감자',
      totalQuantity: 1,
      baseUnit: 'kg',
    },
    {
      ingredientName: '토마토',
      totalQuantity: 4,
      baseUnit: 'kg',
    },
  ] as const satisfies GetIngredientUsageRankingResponseDto['items'],
} as const;
