import { storeRegisterHandler } from './onboarding/store-register';
import { authHandler } from './auth';
import { ingredientHandler } from './ingredient';
import { settingHandler } from './setting';

export const handlers = [
  ...storeRegisterHandler,
  ...authHandler,
  ...settingHandler,
  ...ingredientHandler,
];
