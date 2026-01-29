import { createContext } from 'react';

import { STORE_REGISTER_STEP } from './storeRegisterStep';

interface StoreRegisterStepContextState {
  currentStep: number;
}

interface StoreRegisterStepContextAction {
  moveNextStep: () => void;
  movePreviousStep: () => void;
}

type StoreRegisterStepContext = StoreRegisterStepContextState &
  StoreRegisterStepContextAction;

export const storeRegisterStepContext = createContext<StoreRegisterStepContext>(
  {
    currentStep: STORE_REGISTER_STEP.BUSINESS_REGISTRATION_NUMBER,
    moveNextStep: () => {},
    movePreviousStep: () => {},
  },
);
