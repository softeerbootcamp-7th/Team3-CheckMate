import { redirect } from 'react-router-dom';

import type { QueryClient } from '@tanstack/react-query';

import { getAuthGoogle } from '@/services/auth';
import { authOptions } from '@/services/auth/options';
import { authToken } from '@/services/shared';

const getUserAuthStatus = async (queryClient: QueryClient) => {
  const data = await queryClient
    .ensureQueryData(authOptions.status)
    .catch(() => {
      return null;
    });

  if (!data) {
    return null;
  }

  if (data.hasPosIntegration) {
    return redirect('/dashboard');
  }

  if (data.hasStore) {
    return redirect('/onboarding/pos');
  }

  return redirect('/onboarding/store');
};

export const signInLoader = (queryClient: QueryClient) => async () => {
  const searchParams = new URLSearchParams(window.location.search);

  // google 로그인 이후 redirect_url의 query params 에서 code 와 state 를 추출
  const code = searchParams.get('code');

  // code 와 state 가 없으면 로그인 페이지로 바로 이동
  if (!code) {
    return await getUserAuthStatus(queryClient);
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

  return await getUserAuthStatus(queryClient);
};
