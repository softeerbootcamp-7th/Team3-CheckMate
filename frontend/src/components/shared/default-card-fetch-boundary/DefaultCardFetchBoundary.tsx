import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { DefaultCardFetchErrorFallback } from './DefaultCardFetchErrorFallback';
import { DefaultCardFetchLoadingFallback } from './DefaultCardFetchLoadingFallback';

// 기본 카드(흰 배경, 모서리 라운드)용 에러 바운더리 컴포넌트
type FetchBoundaryProps = {
  children: React.ReactNode;
  className?: string;
};

export const DefaultCardFetchBoundary = ({
  children,
  className,
}: FetchBoundaryProps) => {
  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <DefaultCardFetchErrorFallback {...props} className={className} />
      )}
    >
      <Suspense
        fallback={<DefaultCardFetchLoadingFallback className={className} />}
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
