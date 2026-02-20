import { storeRegisterHandler } from './onboarding/store-register';
import { authHandler } from './auth';
import { aiIngredientRecommendHandler, ingredientHandler } from './ingredient';
import { settingHandler } from './setting';

export const handlers = [
  ...storeRegisterHandler,
  ...aiIngredientRecommendHandler,
  ...authHandler,
  ...settingHandler,
  ...ingredientHandler,
];
