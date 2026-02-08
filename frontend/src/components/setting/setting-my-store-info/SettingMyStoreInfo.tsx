import { useSettingMyStoreInfo } from '@/hooks/setting';

import { SettingMyStoreBusinessHours } from '../setting-my-store-business-hours';
import { SettingMyStoreName } from '../setting-my-store-name';
import { SettingMyStoreSalesClosingTime } from '../setting-my-store-sales-closing-time';

export const SettingMyStoreInfo = () => {
  const { data, isPending, error } = useSettingMyStoreInfo();
  if (isPending) {
    return (
      <section className="rounded-400 bg-special-card-bg flex h-129 w-260 items-center justify-center px-8 pt-6 pb-9">
        Loading...
      </section>
    );
  }
  if (error || !data) {
    return (
      <section className="rounded-400 bg-special-card-bg flex h-129 w-260 items-center justify-center px-8 pt-6 pb-9">
        매장 정보를 불러오지 못했습니다.
      </section>
    );
  }
  return (
    <section className="rounded-400 bg-special-card-bg w-260 px-8 pt-6 pb-9">
      <div>
        <span className="title-small-bold text-grey-900">내 매장 정보</span>
        <div className="bg-grey-300 mt-6 h-0.5 w-244.5" />
        <div className="mt-4 grid grid-cols-2">
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
      </div>
    </section>
  );
};
