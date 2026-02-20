import { type CSSProperties, type ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { DefaultCardFetchErrorFallback } from './DefaultCardFetchErrorFallback';
import { DefaultCardFetchLoadingFallback } from './DefaultCardFetchLoadingFallback';

// 기본 카드(흰 배경, 모서리 라운드)용 에러 바운더리 컴포넌트
interface DefaultCardFetchBoundaryProps {
  children: ReactNode;
  errorFallbackClassName?: string;
  errorFallbackStyle?: CSSProperties;
  loadingFallbackClassName?: string;
  loadingFallbackStyle?: CSSProperties;
}

export const DefaultCardFetchBoundary = ({
  children,
  errorFallbackClassName,
  errorFallbackStyle,
  loadingFallbackClassName,
  loadingFallbackStyle,
}: DefaultCardFetchBoundaryProps) => {
  return (
    <ErrorBoundary
      fallbackRender={(props) => (
        <DefaultCardFetchErrorFallback
          {...props}
          className={errorFallbackClassName}
          style={errorFallbackStyle}
        />
      )}
    >
      <Suspense
        fallback={
          <DefaultCardFetchLoadingFallback
            className={loadingFallbackClassName}
            style={loadingFallbackStyle}
          />
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};
