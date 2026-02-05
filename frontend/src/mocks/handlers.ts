import { aiIngredientRecommendHandler } from './ingredient/ai-ingredient-recommend/aiIngredientRecommendHandler';
import { storeRegisterHandler } from './onboarding/store-register';
import { authHandler } from './auth';

export const handlers = [
  ...storeRegisterHandler,
  ...aiIngredientRecommendHandler,
  ...authHandler,
];
