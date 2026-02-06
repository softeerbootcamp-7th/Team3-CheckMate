import { Input } from '@/components/shared';
import { useStoreAddress } from '@/hooks/onboarding/store-register';

import { AddressSearchButton } from './AddressSearchButton';

export const StoreAddressInput = () => {
  const {
    zonecodeField,
    addressField,
    errorMessage,
    isError,
    addressSearchButtonRef,
    handleClickAddressInput,
  } = useStoreAddress();

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-3">
        <Input
          label="매장 주소"
          description="날씨 기반 매출 분석을 위한 정보예요"
          placeholder="우편번호"
          inputClassName="w-59"
          {...zonecodeField}
          isError={isError}
          onClick={handleClickAddressInput}
          readOnly
          tabIndex={-1}
        />
        <AddressSearchButton ref={addressSearchButtonRef} />
      </div>
      <Input
        placeholder="도로명 주소"
        {...addressField}
        isError={isError}
        errorMessage={errorMessage}
        onClick={handleClickAddressInput}
        readOnly
        tabIndex={-1}
      />
    </div>
  );
};
