import { authorizedApi } from '../shared';

/** 알림 일괄 삭제 */
export const deleteAllNotifications = async () => {
  const { data } = await authorizedApi.delete('/api/notifications');

  return data;
};
