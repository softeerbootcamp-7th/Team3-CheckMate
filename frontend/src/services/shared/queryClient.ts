import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // api 실패 후 재시도 횟수 1회
      // throwOnError를 true로 해야 error boundary가 에러를 전달받을 수 있음
      throwOnError: true,
    },
  },
});
