import { redirect } from 'react-router-dom';

import type { QueryClient } from '@tanstack/react-query';

import { getAuthGoogle } from '@/services/auth';
import { authOptions } from '@/services/auth/options';
import { authToken } from '@/services/shared';

export const signInLoader = (queryClient: QueryClient) => async () => {
  const searchParams = new URLSearchParams(window.location.search);

  // google 로그인 이후 redirect_url의 query params 에서 code 와 state 를 추출
  const code = searchParams.get('code');

  // code 와 state 가 없으면 로그인 페이지로 바로 이동
  if (!code) {
    return;
  }

  // query params 초기화 (새로고침 없이 지우기 위해 replaceState 사용)
  history.replaceState({}, document.title, window.location.pathname);

  // google oauth토큰으로 jwt 토큰 발급
  await getAuthGoogle({
    code,
    redirectUrl: `${window.location.origin}/sign-in`,
  }).then(({ accessToken }) => {
    authToken.set(accessToken);
  });

  // 현재 유저 상태에 따라 redirect
  const { onboaradingStatus } = await queryClient.ensureQueryData(
    authOptions.me,
  );

  switch (onboaradingStatus) {
    case 'NONE':
      throw redirect('/onboarding/store');
    case 'REGISTERED_STORE':
      throw redirect('/onboarding/pos');
    case 'COMPLETED':
      throw redirect('/dashboard');
  }
};
