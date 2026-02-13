import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { CDN_BASE_URL } from '@/constants/shared';
import { authKeys } from '@/services/auth';

import { DashboardNavigateButton } from './DashboardNavigateButton';

export const PosIntegrationSuccessSection = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.refetchQueries({ queryKey: authKeys.status() });
  }, [queryClient]);

  return (
    <section className="flex size-full flex-col items-center gap-[12.5rem] pt-79">
      <div className="flex flex-col items-center gap-8">
        <img
          src={`${CDN_BASE_URL}/assets/images/congratulation.svg`}
          alt="연동 완료"
          className="size-21"
        />
        <div className="flex flex-col items-center gap-1.5">
          <h1 className="headline-small-semibold text-grey-900">
            POS 연동이 완료됐어요
          </h1>
          <p className="title-small-medium text-grey-600">
            이제 매장의 매출 데이터가 자동으로 연동돼요.
          </p>
        </div>
      </div>
      <DashboardNavigateButton />
    </section>
  );
};
