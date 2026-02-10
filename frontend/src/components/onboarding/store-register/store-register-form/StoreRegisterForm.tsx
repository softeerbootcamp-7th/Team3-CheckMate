import { FormProvider } from 'react-hook-form';

import { useStoreRegisterForm } from '@/hooks/onboarding/store-register';

import {
  StoreRegisterFormContent,
  StoreRegisterFormContentLayout,
} from '../store-register-form-content';

export const StoreRegisterForm = () => {
  const { methods, handleSubmit } = useStoreRegisterForm();

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
