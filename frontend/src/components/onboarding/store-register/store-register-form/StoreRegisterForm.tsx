import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import {
  STORE_REGISTER_FORM_DEFAULT_VALUE,
  STORE_REGISTER_STEP,
} from '@/constants/onboarding/store-register';
import { useStoreRegisterStepContext } from '@/hooks/onboarding/store-register';
import type { StoreRegisterForm as StoreRegisterFormType } from '@/types/onboarding/store-register';

import {
  StoreRegisterFormContent,
  StoreRegisterFormContentLayout,
} from '../store-register-form-content';

export const StoreRegisterForm = () => {
  const navigate = useNavigate();
  const methods = useForm<StoreRegisterFormType>({
    mode: 'all',
    defaultValues: STORE_REGISTER_FORM_DEFAULT_VALUE,
  });
  const { currentStep, moveNextStep } = useStoreRegisterStepContext();

  const handleSubmit = methods.handleSubmit((data) => {
    if (currentStep < STORE_REGISTER_STEP.STORE_BUSINESS_HOURS) {
      moveNextStep();
      return;
    }

    if (currentStep === STORE_REGISTER_STEP.STORE_BUSINESS_HOURS) {
      const has24BusinessHour = data.businessHours.some(
        (businessHour) => businessHour.is24,
      );
      if (has24BusinessHour) {
        moveNextStep();
        return;
      }
      // const refinedFormData = refineStoreRegisterFormData(data);
      // console.log(refinedFormData);
      // return;
      navigate('../pos', { replace: true });
    }

    // if (currentStep === STORE_REGISTER_STEP.SALES_CLOSING_TIME) {
    //   const refinedFormData = refineStoreRegisterFormData(data);
    //   console.log(refinedFormData);
    // }
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
