import { useSuspenseQuery } from '@tanstack/react-query';

import { getSettingMyStoreInfo, settingKeys } from '@/services/setting';

export const useSettingMyStoreInfo = () => {
  return useSuspenseQuery({
    queryKey: settingKeys.myStoreInfo(),
    queryFn: getSettingMyStoreInfo,
  });
};
