import { StoreBusinessHoursInputGrid } from '@/components/onboarding/store-register';
import { useInitializeBusinessHours } from '@/hooks/setting';
import type { BusinessHour } from '@/types/shared';

interface SettingMyStoreBusinessHoursProps {
  storeBusinessHours: BusinessHour[];
}

export const SettingMyStoreBusinessHours = ({
  storeBusinessHours,
}: SettingMyStoreBusinessHoursProps) => {
  // 서버값으로 RHF 폼 값을 초기화(덮어쓰기)
  useInitializeBusinessHours({ storeBusinessHours });

  return (
    <article className="flex flex-col gap-3">
      <span className="body-large-semibold text-grey-900">매장 운영 시간</span>

      <StoreBusinessHoursInputGrid />
    </article>
  );
};
