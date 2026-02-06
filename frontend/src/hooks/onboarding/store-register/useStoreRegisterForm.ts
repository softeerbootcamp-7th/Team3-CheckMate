import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  STORE_REGISTER_FORM_DEFAULT_VALUE,
  STORE_REGISTER_STEP,
} from '@/constants/onboarding/store-register';
import { postStoreRegister } from '@/services/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';
import { refineStoreRegisterFormData } from '@/utils/onboarding/store-register';

import { useStoreRegisterStepContext } from './useStoreRegisterStepContext';

export const useStoreRegisterForm = () => {
  const navigate = useNavigate();
  const methods = useForm<StoreRegisterForm>({
    mode: 'all',
    defaultValues: STORE_REGISTER_FORM_DEFAULT_VALUE,
  });

  const { currentStep, moveNextStep } = useStoreRegisterStepContext();

  const { mutate } = useMutation({
    mutationFn: postStoreRegister,
    onSuccess: () => {
      navigate('../pos', { replace: true });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const submitForm = (data: StoreRegisterForm) => {
    const refinedFormData = refineStoreRegisterFormData(data);
    mutate(refinedFormData);
  };

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
      submitForm(data);
      return;
    }

    if (currentStep === STORE_REGISTER_STEP.SALES_CLOSING_TIME) {
      submitForm(data);
    }
  });

  return {
    methods,
    handleSubmit,
  };
};
