import { type FocusEvent, useCallback } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { STORE_REGISTER_FORM_FIELD } from '@/constants/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';
import { validateStoreName } from '@/utils/onboarding/store-register';

export const useStoreName = () => {
  const { control } = useFormContext<StoreRegisterForm>();

  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name: STORE_REGISTER_FORM_FIELD.STORE_NAME,
    control,
    rules: {
      validate: validateStoreName,
    },
    defaultValue: '',
  });

  const handleFocusStoreNameInput = useCallback(
    (element: HTMLInputElement | null) => {
      element?.focus();
    },
    [],
  );

  const combineRefCallback = (element: HTMLInputElement | null) => {
    handleFocusStoreNameInput(element);
    ref(element);
  };

  const handleStoreNameBlur = (event: FocusEvent<HTMLInputElement>) => {
    onChange(event.target.value.trim());
  };

  return {
    value,
    onChange,
    handleStoreNameBlur,
    error,
    combineRefCallback,
  };
};
