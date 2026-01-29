import { type PropsWithChildren, useCallback, useMemo, useState } from 'react';

import {
  STORE_REGISTER_STEP,
  storeRegisterStepContext,
} from '@/constants/onboarding/store-register';

export const StoreRegisterStepProvider = ({ children }: PropsWithChildren) => {
  const [currentStep, setCurrentStep] = useState<number>(
    STORE_REGISTER_STEP.BUSINESS_REGISTRATION_NUMBER,
  );

  const moveNextStep = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const movePreviousStep = useCallback(() => {
    setCurrentStep((prev) => prev - 1);
  }, []);

  const value = useMemo(
    () => ({ currentStep, moveNextStep, movePreviousStep }),
    [currentStep, moveNextStep, movePreviousStep],
  );

  return (
    <storeRegisterStepContext.Provider value={value}>
      {children}
    </storeRegisterStepContext.Provider>
  );
};
