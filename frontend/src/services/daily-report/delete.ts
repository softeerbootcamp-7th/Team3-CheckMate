import { authorizedApi } from '../shared';

export const deleteAllNotifications = async () => {
  const { data } = await authorizedApi.delete('/api/notifications');

  return data;
};
