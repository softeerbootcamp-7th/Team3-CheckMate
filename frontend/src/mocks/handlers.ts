import { http, HttpResponse } from 'msw';

export const handlers = [
  // 테스트용 GET api
  http.get('/api/test', () => {
    return HttpResponse.json({ data: 'hello' }, { status: 200 });
  }),
];
