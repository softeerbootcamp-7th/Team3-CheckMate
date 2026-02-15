import { Button } from '@/components/shared/shadcn-ui';

export const PosIntegrationRetryButton = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <Button
      className="rounded-150 bg-brand-main text-grey-50 title-small-semibold! flex h-14 w-55 items-center justify-center"
      type="button"
      onClick={handleClick}
    >
      다시 시도하기
    </Button>
  );
};
