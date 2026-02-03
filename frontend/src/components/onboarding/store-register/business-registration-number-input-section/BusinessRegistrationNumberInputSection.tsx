import { Input } from '@/components/shared';
import { useBusinessRegistration } from '@/hooks/onboarding/store-register';
import { cn } from '@/utils/shared';

import { NextStepButton } from '../next-step-button';
import { StoreRegisterFormTitle } from '../store-register-form-title';

import { BusinessRegistrationNumberVerifyButton } from './BusinessRegistrationNumberVerifyButton';

export const BusinessRegistrationNumberInputSection = () => {
  const {
    ref,
    onBlur,
    value,
    error,
    verifyButtonRef,
    isError,
    isSuccess,
    isDisabled,
    handlePreventEnter,
    handleBusinessRegistrationNumberChange,
  } = useBusinessRegistration();

  return (
    <>
      <StoreRegisterFormTitle
        title={`안녕하세요 사장님! \n 매장 등록을 시작할게요`}
      />
      <div
        className={cn(
          'flex w-full flex-col',
          isError || isSuccess ? 'gap-0.5' : 'gap-8',
        )}
      >
        <Input
          label="매장 사업자등록번호"
          placeholder="-없이 숫자만 입력"
          type="number"
          ref={ref}
          onChange={handleBusinessRegistrationNumberChange}
          onBlur={onBlur}
          value={value}
          isError={isError}
          errorMessage={error?.message}
          onKeyDown={handlePreventEnter}
          isSuccess={isSuccess}
          successMessage="사업자 인증이 완료되었어요."
        />
        {isSuccess ? (
          <NextStepButton />
        ) : (
          <BusinessRegistrationNumberVerifyButton
            disabled={isDisabled}
            ref={verifyButtonRef}
          />
        )}
      </div>
    </>
  );
};
