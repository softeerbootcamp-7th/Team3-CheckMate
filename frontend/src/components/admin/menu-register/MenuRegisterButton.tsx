import { Button } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface MenuRegisterButtonProps {
  disabled: boolean;
}

export const MenuRegisterButton = ({ disabled }: MenuRegisterButtonProps) => {
  return (
    <Button
      disabled={disabled}
      className={cn(
        'rounded-300 body-large-semibold h-14 w-full',
        disabled
          ? 'bg-grey-300 text-grey-600 hover:bg-grey-300'
          : 'bg-brand-main text-grey-0 hover:bg-brand-600',
      )}
    >
      메뉴 등록하기
    </Button>
  );
};
