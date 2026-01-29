import { StoreAddressInput } from '../store-address-input';
import { StoreNameInput } from '../store-name-input';
import { StoreRegisterFormTitle } from '../store-register-form-title';
import { StoreRegisterStepButtonGroup } from '../store-register-step-button-group';

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
        <StoreRegisterStepButtonGroup />
      </div>
    </>
  );
};
