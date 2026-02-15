// IngredientUsage 예시
// { "ingredientName": "소고기", "totalQuantity": 30000, "baseUnit": "g" },

export interface IngredientUsage {
  ingredientName: string;
  totalQuantity: number;
  baseUnit: string;
}

// 백엔드에서 보내주는 식자재별 소진량 DTO -> 매출별 랭킹에 사용
export interface GetIngredientUsageRankingResponseDto {
  items: IngredientUsage[];
}
