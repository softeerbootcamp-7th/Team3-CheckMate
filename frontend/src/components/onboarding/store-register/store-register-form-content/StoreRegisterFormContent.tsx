import { STORE_REGISTER_STEP } from '@/constants/onboarding/store-register';
import { useStoreRegisterStepContext } from '@/hooks/onboarding/store-register';

import { BusinessRegistrationNumberInputSection } from '../business-registration-number-input-section';
import { StoreInfoInputSection } from '../store-info-input-section';

export const StoreRegisterFormContent = () => {
  const { currentStep } = useStoreRegisterStepContext();
  switch (currentStep) {
    case STORE_REGISTER_STEP.BUSINESS_REGISTRATION_NUMBER:
      return <BusinessRegistrationNumberInputSection />;
    case STORE_REGISTER_STEP.STORE_INFORMATION:
      return <StoreInfoInputSection />;
    default:
      return <></>;
  }
};
