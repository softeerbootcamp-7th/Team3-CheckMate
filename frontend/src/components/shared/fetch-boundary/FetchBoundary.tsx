import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback } from './ErrorFallback';
import { LoadingFallback } from './LoadingFallback';

// 기본 카드(흰 배경, 모서리 라운드)용 에러 바운더리 컴포넌트
type FetchBoundaryProps = {
  children: React.ReactNode;
};

export const FetchBoundary = ({ children }: FetchBoundaryProps) => {
  return (
    <ErrorBoundary fallbackRender={(props) => <ErrorFallback {...props} />}>
      <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
