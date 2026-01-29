import { Button } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface NextStepButtonProps {
  disable?: boolean;
}

export const NextStepButton = ({ disable = false }: NextStepButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        'rounded-150 bg-grey-100 title-small-semibold! text-grey-500 flex h-12 w-20 items-center justify-center self-end px-3 py-2',
        disable ? 'bg-grey-100 text-grey-500' : 'text-grey-50 bg-brand-main',
      )}
    >
      다음
    </Button>
  );
};
