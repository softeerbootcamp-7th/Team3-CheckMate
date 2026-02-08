import { useQuery } from '@tanstack/react-query';

import { getRegisteredMenus } from '@/services/ingredient';

export const useRegisteredMenus = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['registeredMenus'],
    queryFn: getRegisteredMenus,
  });
  return { data, isPending, error };
};
