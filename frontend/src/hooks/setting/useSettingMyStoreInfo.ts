import { useQuery } from '@tanstack/react-query';

import { getSettingMyStoreInfo, settingKeys } from '@/services/setting';

export const useSettingMyStoreInfo = () => {
  const { data, isPending, error } = useQuery({
    queryKey: settingKeys.myStoreInfo(),
    queryFn: getSettingMyStoreInfo,
  });
  return { data, isPending, error };
};
