import { Suspense } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { ErrorFallback } from './ErrorFallback';
import { LoadingFallback } from './LoadingFallback';

// 기본 카드(흰 배경, 모서리 라운드)용 에러 바운더리 컴포넌트
type FetchBoundaryProps = {
  children: React.ReactNode;
  ErrorFallback?: React.ComponentType<FallbackProps>;
  LoadingFallback?: React.ComponentType<React.PropsWithChildren>;
};

export const FetchBoundary = ({
  children,
  ErrorFallback: CustomErrorFallback,
  LoadingFallback: CustomLoadingFallback,
}: FetchBoundaryProps) => {
  const renderErrorFallback = (props: FallbackProps) =>
    CustomErrorFallback ? (
      <CustomErrorFallback {...props} />
    ) : (
      <ErrorFallback {...props} />
    );
  const renderLoadingFallback = CustomLoadingFallback ? (
    <CustomLoadingFallback />
  ) : (
    <LoadingFallback />
  );

  return (
    <ErrorBoundary fallbackRender={renderErrorFallback}>
      <Suspense fallback={renderLoadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};
