import { STORE_REGISTER_STEP } from '@/constants/onboarding/store-register';
import { useStoreRegisterStepContext } from '@/hooks/onboarding/store-register';

import { NextStepButton } from '../next-step-button';
import { PreviousStepButton } from '../previous-step-button';

interface StoreRegisterStepButtonGroupProps {
  disable?: boolean;
}

export const StoreRegisterStepButtonGroup = ({
  disable = false,
}: StoreRegisterStepButtonGroupProps) => {
  const { currentStep } = useStoreRegisterStepContext();
  const isFirstStep =
    currentStep === STORE_REGISTER_STEP.BUSINESS_REGISTRATION_NUMBER;
  return (
    <div className="flex items-center gap-4 self-end">
      {!isFirstStep && <PreviousStepButton />}
      <NextStepButton disable={disable} />
    </div>
  );
};
