import { STORE_BUSINESS_WEEK_DAY_LIST } from '@/constants/onboarding/store-register';
import { useStoreBusinessHours } from '@/hooks/onboarding/store-register';

import { StoreBusinessHoursHeaderRow } from './StoreBusinessHoursHeaderRow';
import { StoreBusinessHoursRow } from './StoreBusinessHoursRow';

export const StoreBusinessHoursInputGrid = () => {
  const {
    value,
    startHourTimeLimit,
    endHourTimeLimit,
    isOver24FromYesterday,
    handleSelectStartTime,
    handleSelectEndTime,
    handleCheck24,
    handleCheckClosed,
  } = useStoreBusinessHours();
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="grid w-full grid-cols-[2.875rem_6.25rem_2.75rem_6.25rem_4.6875rem_3em] flex-nowrap gap-y-2.5">
        <StoreBusinessHoursHeaderRow />
        {STORE_BUSINESS_WEEK_DAY_LIST.map(({ label, id }, index) => (
          <StoreBusinessHoursRow
            key={id}
            label={label}
            businessHour={value[index]}
            startHourTimeLimit={startHourTimeLimit[index]}
            endHourTimeLimit={endHourTimeLimit[index]}
            isOver24FromYesterday={isOver24FromYesterday[index]}
            onSelectStartTime={handleSelectStartTime(index)}
            onSelectEndTime={handleSelectEndTime(index)}
            onCheck24={handleCheck24(index)}
            onCheckClosed={handleCheckClosed(index)}
          />
        ))}
      </div>
    </div>
  );
};
