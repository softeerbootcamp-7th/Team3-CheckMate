import { type ChangeEvent, type KeyboardEvent, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { STORE_REGISTER_FORM_FIELD } from '@/constants/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';
import { validateBusinessRegistrationNumber } from '@/utils/onboarding/store-register';

export const useBusinessRegistration = () => {
  const { control, watch, setValue } = useFormContext<StoreRegisterForm>();
  const {
    field: { ref, onChange, onBlur, value },
    fieldState: { error, isTouched, invalid },
  } = useController({
    name: STORE_REGISTER_FORM_FIELD.BUSINESS_REGISTRATION_NUMBER,
    control,
    rules: {
      validate: validateBusinessRegistrationNumber,
    },
    defaultValue: '',
  });

  const businessAuthToken = watch(
    STORE_REGISTER_FORM_FIELD.BUSINESS_AUTH_TOKEN,
  );

  const verifyButtonRef = useRef<HTMLButtonElement>(null);

  const handlePreventEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      verifyButtonRef.current?.click();
    }
  };

  const handleBusinessRegistrationNumberChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    onChange(event.target.value);
    if (businessAuthToken) {
      setValue(STORE_REGISTER_FORM_FIELD.BUSINESS_AUTH_TOKEN, '');
    }
  };

  const handleFocusNextStepButton = (element?: HTMLButtonElement | null) => {
    element?.focus();
  };

  // error가 있고 한번 이상 blur된 경우
  const isError = !!error && isTouched;

  // 사업자 인증이 완료된 경우
  const isSuccess = !!businessAuthToken;

  // error가 있거나 값이 없는 경우
  const isDisabled = invalid || !value;

  return {
    ref,
    onBlur,
    value,
    verifyButtonRef,
    error,
    isError,
    isSuccess,
    isDisabled,
    handlePreventEnter,
    handleBusinessRegistrationNumberChange,
    handleFocusNextStepButton,
  };
};
