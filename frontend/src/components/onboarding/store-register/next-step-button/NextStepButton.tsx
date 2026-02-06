import type { RefCallback, RefObject } from 'react';
import type { RefCallback, RefObject } from 'react';

import { Button } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface NextStepButtonProps {
  disable?: boolean;
  isLastStep?: boolean;
  ref?:
    | RefObject<HTMLButtonElement | null>
    | RefCallback<HTMLButtonElement | null>;
}

export const NextStepButton = ({
  disable = false,
  isLastStep = false,
  ref,
}: NextStepButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        'rounded-150 bg-grey-100 title-small-semibold! text-grey-500 flex h-12 min-w-20 items-center justify-center self-end px-3 py-2',
        disable ? 'bg-grey-100 text-grey-500' : 'text-grey-50 bg-brand-main',
      )}
      ref={ref}
      disabled={disable}
      ref={ref}
      disabled={disable}
    >
      {isLastStep ? '제출하기' : '다음'}
    </Button>
  );
};
