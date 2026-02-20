import { type FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/shared/shadcn-ui';

interface ErrorFallbackProps extends FallbackProps {
  errorMessage?: string;
  buttonText?: string;
  onClickButton?: () => void;
}
export const ErrorFallback = ({
  error,
  errorMessage,
  buttonText = '다시 시도',
  onClickButton,
  resetErrorBoundary,
}: ErrorFallbackProps) => {
  const handleClick = () => {
    resetErrorBoundary(); // 에러 바운더리의 에러상태 초기화 -> 이걸 해야 에러 바운더리가 다시 자식 컴포넌트를 렌더링 시도함
    onClickButton?.();
  };

  const message =
    error instanceof Error ? error.message : '오류가 발생했습니다.';

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3">
      <p className="body-medium-medium text-center">
        {errorMessage ?? message}
      </p>

      <Button
        className="rounded-200 body-medium-medium bg-brand-main text-grey-50 px-4 py-3"
        onClick={handleClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};
