import { Input } from '@/components/shared';

import { AddressSearchButton } from '../address-search-button';

export const StoreAddressInput = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex gap-3">
        <Input
          label="매장 주소"
          description="날씨 기반 매출 분석을 위한 정보예요"
          placeholder="우편번호"
          inputClassName="w-[14.1875rem]"
        />
        <AddressSearchButton />
      </div>
      <Input placeholder="도로명 주소" disabled />
      <Input placeholder="상세 주소" disabled />
    </div>
  );
};
