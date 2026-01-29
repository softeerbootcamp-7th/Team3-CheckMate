import { type PropsWithChildren, useMemo, useState } from 'react';

import { storeRegisterStepContext } from '@/constants/onboarding/store-register';

export const StoreRegisterStepProvider = ({ children }: PropsWithChildren) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const value = useMemo(() => ({ currentStep, setCurrentStep }), [currentStep]);

  return (
    <storeRegisterStepContext.Provider value={value}>
      {children}
    </storeRegisterStepContext.Provider>
  );
};
