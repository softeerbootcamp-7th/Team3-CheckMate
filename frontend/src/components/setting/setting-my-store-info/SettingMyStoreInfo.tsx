import { FormProvider } from 'react-hook-form';

import { Spinner } from '@/components/shared';
import { useStoreRegisterForm } from '@/hooks/onboarding/store-register';
import { useSettingMyStoreInfo } from '@/hooks/setting';

import { StateWrapper } from '../../shared/state-wrapper';
import { SettingMyStoreBusinessHours } from '../setting-my-store-business-hours';
import { SettingMyStoreName } from '../setting-my-store-name';
import { SettingMyStoreSalesClosingTime } from '../setting-my-store-sales-closing-time';

export const SettingMyStoreInfo = () => {
  const { data, isPending, error } = useSettingMyStoreInfo();
  const { methods } = useStoreRegisterForm();
  if (isPending) {
    return (
      <StateWrapper width={1040} height={590}>
        <Spinner className="size-8" />
      </StateWrapper>
    );
  }
  if (error || !data) {
    return (
      <StateWrapper width={1040} height={590}>
        <span>매장 정보를 불러오지 못했습니다. 다시 시도해 주세요</span>
      </StateWrapper>
    );
  }
  return (
    <FormProvider {...methods}>
      <section className="rounded-400 bg-special-card-bg w-260 px-8 pt-6 pb-9">
        <span className="title-small-bold text-grey-900 w-full">
          내 매장 정보
        </span>
        <div className="bg-grey-300 mt-6 h-0.5 w-244.5" />
        <div className="pointer-events-none mt-4 grid w-full grid-cols-2">
          <div className="flex w-95 flex-col gap-12.5">
            <SettingMyStoreName storeName={data.storeName} />
            <SettingMyStoreSalesClosingTime
              salesClosingTime={data.salesClosingTime}
            />
          </div>
          <SettingMyStoreBusinessHours
            storeBusinessHours={data.businessHours}
          />
        </div>
      </section>
    </FormProvider>
  );
};
