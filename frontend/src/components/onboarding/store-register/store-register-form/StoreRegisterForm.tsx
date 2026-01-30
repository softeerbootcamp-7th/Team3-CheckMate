import { FormProvider, useForm } from 'react-hook-form';

import { STORE_REGISTER_STEP } from '@/constants/onboarding/store-register';
import { useStoreRegisterStepContext } from '@/hooks/onboarding/store-register';

import {
  StoreRegisterFormContent,
  StoreRegisterFormContentLayout,
} from '../store-register-form-content';

export const StoreRegisterForm = () => {
  // TODO: 폼 type 타입 정의하기
  const methods = useForm();
  const { currentStep, moveNextStep } = useStoreRegisterStepContext();

  const handleSubmit = methods.handleSubmit(() => {
    if (currentStep < STORE_REGISTER_STEP.SALES_CLOSING_TIME) {
      moveNextStep();
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
