import { Button } from '@/components/shared/shadcn-ui';
import { useStoreRegisterStepContext } from '@/hooks/onboarding/store-register';

export const PreviousStepButton = () => {
  const { movePreviousStep } = useStoreRegisterStepContext();
  const handleClick = () => {
    movePreviousStep();
  };
  return (
    <Button
      type="button"
      className="bg-brand-50 text-brand-main title-small-semibold! flex h-12 w-25 items-center justify-center"
      onClick={handleClick}
    >
      뒤로가기
    </Button>
  );
};
