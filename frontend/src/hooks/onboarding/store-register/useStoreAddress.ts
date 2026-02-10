import { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { STORE_REGISTER_FORM_FIELD } from '@/constants/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';
import {
  validateAddress,
  validateZipcode,
} from '@/utils/onboarding/store-register';

export const useStoreAddress = () => {
  const { control } = useFormContext<StoreRegisterForm>();

  const addressSearchButtonRef = useRef<HTMLButtonElement>(null);

  const {
    field: zonecodeField,
    fieldState: { error: zonecodeError },
  } = useController({
    name: STORE_REGISTER_FORM_FIELD.ZONE_CODE,
    control,
    rules: {
      validate: validateZipcode,
    },
    defaultValue: '',
  });

  const {
    field: addressField,
    fieldState: { error: addressError },
  } = useController({
    name: STORE_REGISTER_FORM_FIELD.ROAD_ADDRESS,
    control,
    rules: {
      validate: validateAddress,
    },
    defaultValue: '',
  });

  const handleClickAddressInput = () => {
    if (addressSearchButtonRef?.current) {
      addressSearchButtonRef.current.click();
    }
  };

  const errorMessage = zonecodeError?.message || addressError?.message;
  const isError = !!zonecodeError || !!addressError;

  return {
    zonecodeField,
    addressField,
    errorMessage,
    isError,
    addressSearchButtonRef,
    handleClickAddressInput,
  };
};
