import { STORE_REGISTER_STEP_LIST } from '@/constants/onboarding/store-register';

import { StoreRegisterStep } from './StoreRegisterStep';

export const StoreRegisterStepper = () => {
  return (
    <div className="flex flex-col gap-4">
      {STORE_REGISTER_STEP_LIST.map((item) => (
        <StoreRegisterStep
          key={item.step}
          step={item.step}
          label={item.label}
        />
      ))}
    </div>
  );
};
