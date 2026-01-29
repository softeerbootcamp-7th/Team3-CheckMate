import type { STORE_REGISTER_STEP_LIST } from '@/constants/onboarding/store-register';
import { useStoreRegisterStepContext } from '@/hooks/onboarding/store-register';
import { cn } from '@/utils/shared';

type StoreRegisterStepType = (typeof STORE_REGISTER_STEP_LIST)[number];

interface StoreRegisterStepProps {
  step: StoreRegisterStepType['step'];
  label: StoreRegisterStepType['label'];
}

export const StoreRegisterStep = ({ step, label }: StoreRegisterStepProps) => {
  const { currentStep } = useStoreRegisterStepContext();

  const isActiveOrDone = step <= currentStep;
  return (
    <div className="flex items-center gap-3">
      <span
        className={cn(
          'rounded-100 body-large-semibold flex size-7.5 items-center justify-center',
          isActiveOrDone
            ? 'bg-others-50 text-brand-main'
            : 'bg-grey-200 text-grey-700',
        )}
      >
        {step}
      </span>
      <span
        className={cn(
          isActiveOrDone
            ? 'text-brand-main body-large-bold'
            : 'text-grey-600 body-large-medium',
        )}
      >
        {label}
      </span>
    </div>
  );
};
