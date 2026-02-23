import { useQueryClient } from '@tanstack/react-query';

import { QUERY_CACHE } from '@/constants/shared';
import { getRegisteredMenus, ingredientKeys } from '@/services/ingredient';

// 매장 등록된 메뉴 정보 미리 불러오기
export const usePrefetchRegisteredMenus = () => {
  const queryClient = useQueryClient();
  const prefetchMenus = () => {
    queryClient.prefetchQuery({
      queryKey: ingredientKeys.registeredMenus(),
      queryFn: getRegisteredMenus,
      ...QUERY_CACHE.MUTABLE,
    });
  };
  return { prefetchMenus };
};
