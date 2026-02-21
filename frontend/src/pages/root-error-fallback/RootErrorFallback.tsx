import { Navigate, useRouteError } from 'react-router-dom';

import { RefreshCcwIcon } from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';
import { CDN_BASE_URL } from '@/constants/shared';
import { isApiError } from '@/services/shared';

export const RootErrorFallback = () => {
  const error = useRouteError();

  if (isApiError(error)) {
    switch (error.status) {
      case 401:
        return <Navigate to="/sign-in" replace />;
    }
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-3">
      <object
        data={`${CDN_BASE_URL}/assets/images/logoWithTitle.svg`}
        className="absolute top-20 left-20"
      />
      <object data={`${CDN_BASE_URL}/assets/images/pos_not_connected.svg`} />

      <div className="flex flex-col items-center gap-3.75">
        <h1 className="headline-small-semibold text-grey-900">
          서비스를 일시적으로 이용할 수 없어요
        </h1>
        <p className="body-large-medium text-grey-700 whitespace-pre-wrap">
          예상치 못한 오류가 발생하여 페이지를 불러오지 못했습니다.{'\n'}잠시 후
          다시 시도해주세요.
        </p>
        <Button
          className="rounded-200 bg-brand-main text-grey-50 title-small-semibold! mt-5 flex h-14 w-55 items-center justify-center"
          onClick={() => window.location.reload()}
        >
          새로고침하기
          <RefreshCcwIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
