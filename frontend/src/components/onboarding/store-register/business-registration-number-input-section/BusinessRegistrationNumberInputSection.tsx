import { useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';

import { Input } from '@/components/shared';
import { Button } from '@/components/shared/shadcn-ui';
import { STORE_REGISTER_FORM_FIELD } from '@/constants/onboarding/store-register';
import { postBusinessRegistrationNumber } from '@/services/onboarding/store-register';
import type { StoreRegisterForm } from '@/types/onboarding/store-register';
import { validateBusinessRegistrationNumber } from '@/utils/onboarding/store-register';
import { cn } from '@/utils/shared';

import { StoreRegisterFormTitle } from '../store-register-form-title';

export const BusinessRegistrationNumberInputSection = () => {
  const { control, setValue, watch } = useFormContext<StoreRegisterForm>();
  const {
    field: { ref, onChange, onBlur, value },
    fieldState: { error, isTouched, invalid },
  } = useController({
    name: STORE_REGISTER_FORM_FIELD.BUSINESS_REGISTRATION_NUMBER,
    control,
    rules: {
      validate: validateBusinessRegistrationNumber,
    },
    defaultValue: '',
  });

  const businessAuthToken = watch(
    STORE_REGISTER_FORM_FIELD.BUSINESS_AUTH_TOKEN,
  );

  const { mutate } = useMutation({
    mutationFn: postBusinessRegistrationNumber,
    onSuccess: ({ businessAuthToken }) => {
      setValue(
        STORE_REGISTER_FORM_FIELD.BUSINESS_AUTH_TOKEN,
        businessAuthToken,
      );
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const verifyButtonRef = useRef<HTMLButtonElement>(null);

  const handleVerifyBusinessRegistrationNumber = () => {
    mutate({
      businessRegistrationNumber: value,
    });
  };

  const handlePreventEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      verifyButtonRef.current?.click();
    }
  };

  // error가 있고 한번 이상 blur된 경우
  const isError = !!error && isTouched;

  // error가 있거나 값이 없는 경우
  const isDisabled = invalid || !value;

  return (
    <>
      <StoreRegisterFormTitle
        title={`안녕하세요 사장님! \n 매장 등록을 시작할게요`}
      />
      <div
        className={cn('flex w-full flex-col', isError ? 'gap-0.5' : 'gap-8')}
      >
        <Input
          label="매장 사업자등록번호"
          placeholder="-없이 숫자만 입력"
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          isError={isError && isTouched}
          errorMessage={error?.message}
          onKeyDown={handlePreventEnter}
        />
        {businessAuthToken ? (
          <div>
            <p>사업자 인증 성공</p>
          </div>
        ) : (
          <Button
            type="button"
            className={cn(
              'rounded-150 bg-grey-100 title-small-semibold! text-grey-500 flex h-12 w-20 items-center justify-center self-end px-3 py-2',
              isDisabled
                ? 'bg-grey-100 text-grey-500'
                : 'text-grey-50 bg-brand-main',
            )}
            onClick={handleVerifyBusinessRegistrationNumber}
            disabled={isDisabled}
            ref={verifyButtonRef}
          >
            조회
          </Button>
        )}
      </div>
    </>
  );
};
