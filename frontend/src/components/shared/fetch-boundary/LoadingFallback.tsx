import { Spinner } from '@/components/shared/';

export const LoadingFallback = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-3">
      <Spinner className="size-8" />
      <span className="body-medium-medium">데이터를 불러오는 중 입니다</span>
    </div>
  );
};
