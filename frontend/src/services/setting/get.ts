import type { GetSettingMyStoreInfoResponseDto } from '@/types/setting';

import { authorizedApi } from '../shared';

export const getSettingMyStoreInfo = async () => {
  const { data } =
    await authorizedApi.get<GetSettingMyStoreInfoResponseDto>('/api/stores');

  return data;
};
