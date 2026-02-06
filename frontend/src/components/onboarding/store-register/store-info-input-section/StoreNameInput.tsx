import { Input } from '@/components/shared';
import { useStoreName } from '@/hooks/onboarding/store-register';

export const StoreNameInput = () => {
  const { combineRefCallback, error, value, handleStoreNameBlur, onChange } =
    useStoreName();

  return (
    <Input
      label="매장명"
      description="서비스 안에서 표시될 이름이에요"
      placeholder="매장명을 입력해주세요"
      isError={!!error}
      errorMessage={error?.message}
      value={value}
      onChange={onChange}
      onBlur={handleStoreNameBlur}
      ref={combineRefCallback}
    />
  );
};
