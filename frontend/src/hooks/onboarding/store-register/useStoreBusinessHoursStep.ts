import { useController, useFormContext } from 'react-hook-form';

import { STORE_REGISTER_FORM_FIELD } from '@/constants/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';

export const useStoreBusinessHoursStep = () => {
  const { control } = useFormContext<StoreRegisterForm>();

  const {
    field: { value },
    fieldState: { error },
  } = useController({
    name: STORE_REGISTER_FORM_FIELD.BUSINESS_HOUR_REQUESTS,
    control,
  });

  const isError = !!error;
  const errorMessage = error?.message;

  const has24BusinessHour = value.some(
    (businessHourRequest) => businessHourRequest.is24,
  );

  return {
    isError,
    errorMessage,
    has24BusinessHour,
  };
};
