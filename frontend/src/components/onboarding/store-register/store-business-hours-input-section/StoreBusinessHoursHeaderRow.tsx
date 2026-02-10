import { memo } from 'react';

export const StoreBusinessHoursHeaderRow = memo(() => {
  return (
    <>
      <span className="body-medium-semibold text-grey-600 col-start-2 text-center">
        영업시작
      </span>
      <span className="body-medium-semibold text-grey-600 col-start-4 text-center">
        영업마감
      </span>
      <span className="body-medium-semibold text-grey-600 col-start-5 pr-3 text-end">
        24시
      </span>
      <span className="body-medium-semibold text-grey-600 col-start-6 text-end">
        휴무
      </span>
    </>
  );
});

StoreBusinessHoursHeaderRow.displayName = 'StoreBusinessHoursHeaderRow';
