import { OnboardingSidebar } from '@/components/onboarding/shared';

import { StoreRegisterStepIndicator } from '../store-register-step-indicator';

export const StoreRegisterSidebar = () => {
  return (
    <OnboardingSidebar>
      <StoreRegisterStepIndicator />
    </OnboardingSidebar>
  );
};
