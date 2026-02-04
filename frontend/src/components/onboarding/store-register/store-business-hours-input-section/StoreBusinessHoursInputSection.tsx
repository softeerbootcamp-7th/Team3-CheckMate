import { StoreRegisterFormTitle } from '../store-register-form-title';
import { StoreRegisterStepButtonGroup } from '../store-register-step-button-group';

import { StoreBusinessHoursInputGrid } from './StoreBusinessHoursInputGrid';

export const StoreBusinessHoursInputSection = () => {
  return (
    <>
      <StoreRegisterFormTitle
        title={`영업시간을 입력하고\n하루 리포트를 받아보세요`}
      />
      <div className="flex flex-col gap-8">
        <StoreBusinessHoursInputGrid />
        <StoreRegisterStepButtonGroup />
      </div>
    </>
  );
};
