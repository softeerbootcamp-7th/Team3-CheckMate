import { STORE_REGISTER_STEP_LIST } from '@/constants/onboarding/store-register';

export const StoreRegisterStepIndicator = () => {
  return (
    <div className="flex flex-col gap-4">
      {STORE_REGISTER_STEP_LIST.map((item) => (
        <div key={item.step} className="flex items-center gap-3">
          <span className="rounded-100 body-large-semibold bg-grey-200 text-grey-700 flex size-7.5 items-center justify-center">
            {item.step}
          </span>
          <span className="body-large-bold text-grey-600">{item.label}</span>
        </div>
      ))}
    </div>
  );
};
