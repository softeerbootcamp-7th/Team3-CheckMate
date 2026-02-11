import type { FallbackProps } from 'react-error-boundary';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { Button } from '@/components/shared/shadcn-ui';

export const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const handleClickReset = () => {
    resetErrorBoundary(); // 에러 바운더리의 에러상태 초기화 -> 이걸 해야 에러 바운더리가 다시 자식 컴포넌트를 렌더링 시도함
    reset(); // tanstack Query의 에러 상태를 초기화
  };
  return (
    <div className="flex h-full w-full flex-col items-center gap-3">
      <pre className="body-medium-medium text-center">오류가 발생했습니다!</pre>

      <Button
        className="rounded-200 body-medium-medium bg-brand-main text-grey-50 px-4 py-3"
        onClick={handleClickReset}
      >
        다시 불러오기
      </Button>
    </div>
  );
};
