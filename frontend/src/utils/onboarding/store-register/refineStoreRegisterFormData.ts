import type { StoreRegisterForm } from '@/types/onboarding/store-register';

export const refineStoreRegisterFormData = (
  data: StoreRegisterForm,
): StoreRegisterForm => {
  return {
    ...data,
    businessHours: data.businessHours.map((businessHour) => {
      return {
        ...businessHour,
        openTime: businessHour.openTime ? businessHour.openTime : undefined,
        closeTime: businessHour.closeTime ? businessHour.closeTime : undefined,
        isOver24: undefined,
      };
    }),
  };
};
