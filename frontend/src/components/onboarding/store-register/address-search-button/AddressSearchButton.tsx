import { Search } from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';
interface AddressSearchButtonProps {
  className?: string;
}

export const AddressSearchButton = ({
  className,
}: AddressSearchButtonProps) => {
  return (
    <Button
      type="button"
      className={cn(
        'bg-brand-main body-medium-semibold! text-grey-50 shirnk-0 absolute right-0 bottom-0 flex h-12 items-center gap-2.5 px-3',
        className,
      )}
    >
      <Search className="size-5 text-current" />
      우편번호 찾기
    </Button>
  );
};
