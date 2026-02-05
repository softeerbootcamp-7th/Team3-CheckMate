import { redirect } from 'react-router-dom';

import type { QueryClient } from '@tanstack/react-query';

import { getAuthGoogle } from '@/services/auth';
import { authOptions } from '@/services/auth/options';

const getUserOnboardingStatus = async (queryClient: QueryClient) => {
  const data = await queryClient.ensureQueryData(authOptions.me).catch(() => {
    return null;
  });

  if (!data) {
    return null;
  }

  switch (data.onboardingStatus) {
    case 'NONE':
      return redirect('/onboarding/store');
    case 'REGISTERED_STORE':
      return redirect('/onboarding/pos');
    case 'COMPLETED':
      return redirect('/dashboard');
  }
};

export const signInLoader = (queryClient: QueryClient) => async () => {
  const searchParams = new URLSearchParams(window.location.search);

  // google 로그인 이후 redirect_url의 query params 에서 code 와 state 를 추출
  const code = searchParams.get('code');

  // code 와 state 가 없으면 로그인 페이지로 바로 이동
  if (!code) {
    return await getUserOnboardingStatus(queryClient);
  }

  // query params 초기화 (새로고침 없이 지우기 위해 replaceState 사용)
  history.replaceState({}, document.title, window.location.pathname);

  // google oauth토큰으로 jwt 토큰 발급
  await getAuthGoogle({
    code,
    redirectUrl: `${window.location.origin}/sign-in`,
  });

  return await getUserOnboardingStatus(queryClient);
};
