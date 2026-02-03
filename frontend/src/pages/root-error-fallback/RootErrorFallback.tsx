import { Navigate, useRouteError } from 'react-router-dom';

import { ApiError } from '@/services/shared';

// TODO: 에러 페이지 디자인 추가
export const RootErrorFallback = () => {
  const error = useRouteError();

  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        return <Navigate to="/sign-in" replace />;
    }
  }

  console.error(error);

  const errorMessage = error instanceof Error ? error.message : 'Unknown error';

  return <div>에러 발생 : {errorMessage}</div>;
};
