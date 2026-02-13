import { FormProvider } from 'react-hook-form';

import { useStoreRegisterForm } from '@/hooks/onboarding/store-register';
import { useSettingMyStoreInfo } from '@/hooks/setting';

import { SettingMyStoreBusinessHours } from '../setting-my-store-business-hours';
import { SettingMyStoreName } from '../setting-my-store-name';
import { SettingMyStoreSalesClosingTime } from '../setting-my-store-sales-closing-time';

export const SettingMyStoreInfo = () => {
  const { data } = useSettingMyStoreInfo();
  const { methods } = useStoreRegisterForm();

  return (
    <FormProvider {...methods}>
      <section className="rounded-400 bg-special-card-bg w-260 px-8 pt-6 pb-9">
        <span className="title-small-bold text-grey-900 w-full">
          내 매장 정보
        </span>
        <div className="bg-grey-300 mt-6 h-0.5 w-244.5" />
        <div className="mt-4 grid w-full grid-cols-2">
          <div className="flex w-95 flex-col gap-12.5">
            <SettingMyStoreName storeName={data.storeName} />
            <SettingMyStoreSalesClosingTime
              salesClosingTime={data.salesClosingHour}
            />
          </div>
          <SettingMyStoreBusinessHours
            storeBusinessHours={data.businessHourRequests}
          />
        </div>
      </section>
    </FormProvider>
  );
};
