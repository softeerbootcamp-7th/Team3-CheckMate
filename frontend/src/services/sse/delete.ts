import { authorizedApi } from '../shared';

export const deleteSseConnection = async () => {
  await authorizedApi.delete('/api/sse/connection');
};
