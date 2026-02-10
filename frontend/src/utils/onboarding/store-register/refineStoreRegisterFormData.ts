import type { StoreRegisterForm } from '@/types/onboarding/store-register';

export const refineStoreRegisterFormData = (
  data: StoreRegisterForm,
): Omit<StoreRegisterForm, 'businessRegistrationNumber'> => {
  const { businessRegistrationNumber: _, ...rest } = data;
  return {
    ...rest,
    businessHours: rest.businessHours.map((businessHour) => {
      return {
        ...businessHour,
        openTime: businessHour.openTime || undefined,
        closeTime: businessHour.closeTime || undefined,
        isOver24: undefined,
      };
    }),
  };
};
