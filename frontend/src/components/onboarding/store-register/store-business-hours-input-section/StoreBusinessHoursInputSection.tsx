import { useStoreBusinessHoursStep } from '@/hooks/onboarding/store-register';

import { StoreRegisterFormTitle } from '../store-register-form-title';
import { StoreRegisterStepButtonGroup } from '../store-register-step-button-group';

import { StoreBusinessHoursInputErrorMessage } from './StoreBusinessHoursInputErrorMessage';
import { StoreBusinessHoursInputGrid } from './StoreBusinessHoursInputGrid';

export const StoreBusinessHoursInputSection = () => {
  const { isError, errorMessage, has24BusinessHour } =
    useStoreBusinessHoursStep();
  return (
    <>
      <StoreRegisterFormTitle
        title={`영업시간을 입력하고\n하루 리포트를 받아보세요`}
      />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-3">
          <StoreBusinessHoursInputGrid />
          {isError && (
            <StoreBusinessHoursInputErrorMessage errorMessage={errorMessage} />
          )}
        </div>
        <StoreRegisterStepButtonGroup
          disable={isError}
          isLastStep={!has24BusinessHour}
        />
      </div>
    </>
  );
};
