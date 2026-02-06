import { storeRegisterHandler } from './onboarding/store-register';
import { authHandler } from './auth';

export const handlers = [...storeRegisterHandler, ...authHandler];
