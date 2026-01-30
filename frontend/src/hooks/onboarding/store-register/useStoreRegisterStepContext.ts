import { useContext } from 'react';

import { storeRegisterStepContext } from '@/constants/onboarding/store-register';

export const useStoreRegisterStepContext = () => {
  const context = useContext(storeRegisterStepContext);

  if (!context) {
    throw new Error('StoreRegisterStepContext not found');
  }

  return context;
};
