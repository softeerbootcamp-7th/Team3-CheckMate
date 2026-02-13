import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { STORE_REGISTER_FORM_FIELD } from '@/constants/onboarding/store-register';
import type { BusinessHourRequest } from '@/types/shared';

interface UseInitializeBusinessHoursParams {
  storeBusinessHours: BusinessHourRequest[];
}
// 매장 영업시간 시간 초기화 로직 구현
export const useInitializeBusinessHours = ({
  storeBusinessHours,
}: UseInitializeBusinessHoursParams) => {
  const { setValue } = useFormContext();
  // 서버값으로 RHF 폼 값을 초기화(덮어쓰기)
  useEffect(() => {
    setValue(
      STORE_REGISTER_FORM_FIELD.BUSINESS_HOUR_REQUESTS,
      storeBusinessHours,
    );
  }, [storeBusinessHours, setValue]);
};
