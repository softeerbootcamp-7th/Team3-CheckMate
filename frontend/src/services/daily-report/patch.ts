import { authorizedApi } from '../shared';

/** 알림 일괄 읽음 */
export const patchReadNotification = async () => {
  const { data } = await authorizedApi.patch('/api/notifications/read');

  return data;
};
