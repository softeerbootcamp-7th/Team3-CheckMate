import { Button } from '@/components/shared/shadcn-ui';

export const PosIntegrationRetryButton = () => {
  const handleClick = () => {
    // TODO: 재시도 로직 구현 필요
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
