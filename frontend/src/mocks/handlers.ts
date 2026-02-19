import { aiIngredientRecommendHandler } from './ingredient/ai-ingredient-recommend/aiIngredientRecommendHandler';
import { storeRegisterHandler } from './onboarding/store-register';
import { authHandler } from './auth';
import { notificationHandler } from './daily-report';
import { ingredientHandler } from './ingredient';
import { settingHandler } from './setting';

export const handlers = [
  ...storeRegisterHandler,
  ...aiIngredientRecommendHandler,
  ...authHandler,
  ...settingHandler,
  ...ingredientHandler,
  ...notificationHandler,
];
