import { FormProvider, useForm } from 'react-hook-form';

import { STORE_REGISTER_STEP } from '@/constants/onboarding/store-register';
import { useStoreRegisterStepContext } from '@/hooks/onboarding/store-register';
import type { StoreRegisterForm as StoreRegisterFormType } from '@/types/onboarding/store-register';

import {
  StoreRegisterFormContent,
  StoreRegisterFormContentLayout,
} from '../store-register-form-content';

export const StoreRegisterForm = () => {
  const methods = useForm<StoreRegisterFormType>({
    mode: 'all',
  });
  const { currentStep, moveNextStep } = useStoreRegisterStepContext();

  const handleSubmit = methods.handleSubmit(() => {
    if (currentStep < STORE_REGISTER_STEP.SALES_CLOSING_TIME) {
      moveNextStep();
      return;
    }
  });

  return (
    <FormProvider {...methods}>
      <form className="size-full" onSubmit={handleSubmit}>
        <StoreRegisterFormContentLayout>
          <StoreRegisterFormContent />
        </StoreRegisterFormContentLayout>
      </form>
    </FormProvider>
  );
};
