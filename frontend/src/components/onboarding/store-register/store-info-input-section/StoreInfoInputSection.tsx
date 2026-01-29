import { NextStepButton } from '../next-step-button';
import { PreviousStepButton } from '../previous-step-button';
import { StoreAddressInput } from '../store-address-input';
import { StoreNameInput } from '../store-name-input';
import { StoreRegisterFormTitle } from '../store-register-form-title';

export const StoreInfoInputSection = () => {
  return (
    <>
      <StoreRegisterFormTitle
        title={`매장 정보를 입력하면 \n 맞춤형 서비스를 제공해요`}
      />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-9">
          <StoreNameInput />
          <StoreAddressInput />
        </div>
        <div className="flex items-center gap-4 self-end">
          <PreviousStepButton />
          <NextStepButton />
        </div>
      </div>
    </>
  );
};
