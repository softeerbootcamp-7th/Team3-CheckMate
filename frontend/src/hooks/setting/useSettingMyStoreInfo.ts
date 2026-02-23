import { useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_CACHE } from '@/constants/shared';
import { getSettingMyStoreInfo, settingKeys } from '@/services/setting';

export const useSettingMyStoreInfo = () => {
  return useSuspenseQuery({
    queryKey: settingKeys.myStoreInfo(),
    queryFn: getSettingMyStoreInfo,
    ...QUERY_CACHE.IMMUTABLE,
  });
};
