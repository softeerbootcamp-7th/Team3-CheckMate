import { NextStepButton } from '@/components/onboarding/store-register/next-step-button';
import { PreviousStepButton } from '@/components/onboarding/store-register/previous-step-button';
import { STORE_REGISTER_STEP } from '@/constants/onboarding/store-register';
import { useStoreRegisterStepContext } from '@/hooks/onboarding/store-register';

export const StoreRegisterStepButtonGroup = () => {
  const { currentStep } = useStoreRegisterStepContext();
  const isFirstStep =
    currentStep === STORE_REGISTER_STEP.BUSINESS_REGISTRATION_NUMBER;
  return (
    <div className="flex items-center gap-4 self-end">
      {!isFirstStep && <PreviousStepButton />}
      <NextStepButton />
    </div>
  );
};
