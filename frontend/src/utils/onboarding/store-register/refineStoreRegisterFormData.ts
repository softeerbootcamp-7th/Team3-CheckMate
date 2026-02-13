import type { StoreRegisterForm } from '@/types/onboarding/store-register';

export const refineStoreRegisterFormData = (
  data: StoreRegisterForm,
): Omit<StoreRegisterForm, 'businessRegistrationNumber'> => {
  const { businessRegistrationNumber: _, ...rest } = data;
  return {
    ...rest,
    businessHourRequests: rest.businessHourRequests.map(
      (businessHourRequest) => {
        return {
          ...businessHourRequest,
          openTime: businessHourRequest.openTime || undefined,
          closeTime: businessHourRequest.closeTime || undefined,
          isOver24: undefined,
        };
      },
    ),
  };
};
