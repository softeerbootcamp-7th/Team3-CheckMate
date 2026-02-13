import { authorizedApi } from '@/services/shared';

export const postPosIntegration = async () => {
  const { data } = await authorizedApi.post('/api/stores/pos/connect');

  return data;
};
