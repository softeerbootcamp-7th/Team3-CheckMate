import { Spinner } from '@/components/shared';
import { Button } from '@/components/shared/shadcn-ui';
import { useVerifyBusinessRegistrationNumber } from '@/hooks/onboarding/store-register';
import { cn } from '@/utils/shared';

interface BusinessRegistrationNumberVerifyButtonProps {
  disabled?: boolean;
  ref: React.RefObject<HTMLButtonElement | null>;
}

export const BusinessRegistrationNumberVerifyButton = ({
  disabled = false,
  ref,
}: BusinessRegistrationNumberVerifyButtonProps) => {
  const { isPending, handleVerifyBusinessRegistrationNumber } =
    useVerifyBusinessRegistrationNumber();

  return (
    <Button
      type="button"
      className={cn(
        'rounded-150 bg-grey-100 title-small-semibold! text-grey-500 flex h-12 w-20 items-center justify-center self-end px-3 py-2',
        disabled ? 'bg-grey-100 text-grey-500' : 'text-grey-50 bg-brand-main',
      )}
      onClick={isPending ? undefined : handleVerifyBusinessRegistrationNumber}
      disabled={disabled}
      ref={ref}
    >
      {isPending ? <Spinner className="size-4" /> : '조회'}
    </Button>
  );
};
