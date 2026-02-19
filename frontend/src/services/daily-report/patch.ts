import { authorizedApi } from '../shared';

export const patchReadNotification = async () => {
  const { data } = await authorizedApi.patch('/api/notifications/read');

  return data;
};
