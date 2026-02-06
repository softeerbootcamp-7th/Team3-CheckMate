import type { RefObject } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useFormContext } from 'react-hook-form';

import { Search } from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';
import { STORE_REGISTER_FORM_FIELD } from '@/constants/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';
import { cn } from '@/utils/shared';

interface AddressSearchButtonProps {
  ref?: RefObject<HTMLButtonElement | null>;
  className?: string;
}

export const AddressSearchButton = ({
  ref,
  className,
}: AddressSearchButtonProps) => {
  const { setValue } = useFormContext<StoreRegisterForm>();
  const open = useDaumPostcodePopup();

  const handleClickAddressSearchButton = () => {
    open({
      onComplete: (data) => {
        setValue(STORE_REGISTER_FORM_FIELD.ZONE_CODE, data.zonecode, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
        setValue(STORE_REGISTER_FORM_FIELD.ROAD_ADDRESS, data.roadAddress, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      },
    });
  };
  return (
    <Button
      type="button"
      className={cn(
        'bg-brand-main title-small-semibold! text-grey-50 absolute right-0 bottom-0 flex h-12 shrink-0 items-center gap-2.5 px-3',
        className,
      )}
      onClick={handleClickAddressSearchButton}
      ref={ref}
      aria-label="주소 찾기 버튼"
    >
      <Search className="size-5 text-current" />
      주소 찾기
    </Button>
  );
};
