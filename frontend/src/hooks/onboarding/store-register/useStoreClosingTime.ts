import { useCallback, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { STORE_REGISTER_FORM_FIELD } from '@/constants/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';

export const useStoreClosingTime = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const { control } = useFormContext<StoreRegisterForm>();
  const {
    field: { value, onChange },
  } = useController({
    name: STORE_REGISTER_FORM_FIELD.SALES_CLOSING_HOUR,
    control,
  });

  const handleSelectClosingTime = useCallback(
    (time: string) => {
      onChange(Number(time.split('시')[0]));
    },
    [onChange],
  );

  return {
    isOpen,
    handleOpenChange,
    value,
    handleSelectClosingTime,
  };
};
