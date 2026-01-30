import { STORE_BUSINESS_WEEK_DAY_LIST } from '@/constants/onboarding/store-register';

import {
  StoreBusinessHoursHeaderRow,
  StoreBusinessHoursRow,
} from '../store-business-hours-row';

export const StoreBusinessHoursInputGrid = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <p className="body-large-medium text-grey-700">
        24시간 운영 매장은 00:00~24:00를 선택해주세요.
      </p>
      <div className="grid w-full grid-cols-[2.875rem_6.25rem_2.75rem_6.25rem_4.6875rem] gap-y-2.5">
        <StoreBusinessHoursHeaderRow />
        {STORE_BUSINESS_WEEK_DAY_LIST.map(({ label, id }) => (
          <StoreBusinessHoursRow key={id} label={label} id={id} />
        ))}
      </div>
    </div>
  );
};
