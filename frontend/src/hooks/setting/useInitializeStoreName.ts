import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { STORE_REGISTER_FORM_FIELD } from '@/constants/onboarding/store-register';

interface UseInitializeStoreNameParams {
  storeName: string;
}

export const useInitializeStoreName = ({
  storeName,
}: UseInitializeStoreNameParams) => {
  const { setValue } = useFormContext();
  useEffect(() => {
    setValue(STORE_REGISTER_FORM_FIELD.STORE_NAME, storeName);
  }, [storeName, setValue]);
};
