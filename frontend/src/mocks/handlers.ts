import { storeRegisterHandler } from './onboarding/store-register';
import { authHandler } from './auth';
import { settingHandler } from './setting';

export const handlers = [
  ...storeRegisterHandler,
  ...authHandler,
  ...settingHandler,
];
