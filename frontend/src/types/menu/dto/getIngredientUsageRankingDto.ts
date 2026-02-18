// IngredientUsage 예시
// { "ingredientName": "소고기", "totalQuantity": 30000, "baseUnit": "g" },

export interface IngredientUsage {
  ingredientName: string;
  totalQuantity: number;
  baseUnit: string;
}
// GetIngredientUsageRankingResponseDto 예시
// {
//   "hasIngredient": true,
//   "items": [
//     {
//       "ingredientName": "소고기",
//       "totalQuantity": 30000,
//       "baseUnit": "g"
//     },
//     {
//       "ingredientName": "치즈",
//       "totalQuantity": 5000,
//       "baseUnit": "g"
//     }
//   ]
// }

// 백엔드에서 보내주는 식자재별 소진량 DTO -> 식자재별 소진량 랭킹에 사용
export interface GetIngredientUsageRankingResponseDto {
  hasIngredient: boolean; // 식자재 등록 여부
  items: IngredientUsage[];
}
