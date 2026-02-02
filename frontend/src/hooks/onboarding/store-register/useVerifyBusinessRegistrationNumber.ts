import { useFormContext } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { STORE_REGISTER_FORM_FIELD } from '@/constants/onboarding/store-register';
import { postBusinessRegistrationNumber } from '@/services/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';

export const useVerifyBusinessRegistrationNumber = () => {
  const { setValue, getValues, setError } = useFormContext<StoreRegisterForm>();

  const { mutate, isPending } = useMutation({
    mutationFn: postBusinessRegistrationNumber,
    onSuccess: ({ businessAuthToken }) => {
      setValue(
        STORE_REGISTER_FORM_FIELD.BUSINESS_AUTH_TOKEN,
        businessAuthToken,
      );
    },
    onError: (error) => {
      setError(STORE_REGISTER_FORM_FIELD.BUSINESS_REGISTRATION_NUMBER, {
        message: error.message ?? '사업자등록번호 검증에 실패했습니다.',
      });
    },
  });

  const handleVerifyBusinessRegistrationNumber = () => {
    mutate({
      businessRegistrationNumber: getValues(
        STORE_REGISTER_FORM_FIELD.BUSINESS_REGISTRATION_NUMBER,
      ),
    });
  };

  return {
    isPending,
    handleVerifyBusinessRegistrationNumber,
  };
};
