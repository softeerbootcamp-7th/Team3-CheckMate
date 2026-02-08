import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

import { StoreBusinessHoursInputGrid } from '@/components/onboarding/store-register/store-business-hours-input-section/StoreBusinessHoursInputGrid';
import { STORE_REGISTER_FORM_FIELD } from '@/constants/onboarding/store-register';
import { useStoreRegisterForm } from '@/hooks/onboarding/store-register';
import type { BusinessHour } from '@/types/shared';

interface SettingMyStoreBusinessHoursProps {
  storeBusinessHours: BusinessHour[];
}

export const SettingMyStoreBusinessHours = ({
  storeBusinessHours,
}: SettingMyStoreBusinessHoursProps) => {
  const { methods } = useStoreRegisterForm();

  // 서버값으로 RHF 폼 값을 초기화(덮어쓰기)
  useEffect(() => {
    if (!storeBusinessHours) {
      return;
    }
    methods.setValue(
      STORE_REGISTER_FORM_FIELD.BUSINESS_HOURS,
      storeBusinessHours,
    );
  }, [storeBusinessHours, methods]);

  return (
    <article className="pointer-events-none flex flex-col gap-3">
      <span className="body-large-semibold text-grey-900">매장 운영 시간</span>

      <FormProvider {...methods}>
        <StoreBusinessHoursInputGrid />
      </FormProvider>
    </article>
  );
};
