import { Input } from '@/components/shared';

import { NextStepButton } from '../next-step-button';
import { StoreRegisterFormTitle } from '../store-register-form-title';

export const BusinessRegistrationNumberInputSection = () => {
  return (
    <section className="flex flex-col items-center pt-32">
      <div className="flex w-95 flex-col gap-12">
        <StoreRegisterFormTitle
          title={`안녕하세요 사장님! \n 매장 등록을 시작할게요`}
        />
        <div className="flex w-full flex-col gap-8">
          <Input label="매장 사업자등록번호" placeholder="-없이 숫자만 입력" />
          <NextStepButton />
        </div>
      </div>
    </section>
  );
};
