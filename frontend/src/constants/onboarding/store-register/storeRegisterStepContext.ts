import { createContext } from 'react';

interface StoreRegisterStepContextState {
  currentStep: number;
}

interface StoreRegisterStepContextAction {
  setCurrentStep: (currentStep: number) => void;
}

type StoreRegisterStepContext = StoreRegisterStepContextState &
  StoreRegisterStepContextAction;

export const storeRegisterStepContext = createContext<StoreRegisterStepContext>(
  {
    currentStep: 1,
    setCurrentStep: () => {},
  },
);
