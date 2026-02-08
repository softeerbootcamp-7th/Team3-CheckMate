import { useQuery } from '@tanstack/react-query';

import { getSettingMyStoreInfo } from '@/services/setting';

export const useSettingMyStoreInfo = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['myStoreInfo'],
    queryFn: getSettingMyStoreInfo,
  });
  return { data, isPending, error };
};
