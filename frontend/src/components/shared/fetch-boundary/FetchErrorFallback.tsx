import type { FallbackProps } from 'react-error-boundary';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { ErrorFallback } from '../error-fallback';

export const FetchErrorFallback = (props: FallbackProps) => {
  const { reset } = useQueryErrorResetBoundary();

  const handleClickReset = () => {
    reset(); // tanstack Query의 에러 상태를 초기화
  };

  return (
    <ErrorFallback
      {...props}
      buttonText="다시 불러오기"
      onClickButton={handleClickReset}
    />
  );
};
