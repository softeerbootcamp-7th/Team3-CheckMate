import { HttpResponse } from 'msw';

import { mswHttp } from '@/mocks/shared';
import type { SuccessResponse } from '@/services/shared';
import type { GetNextClosingTimeResponseDto } from '@/types/daily-report';

export const getHandler = [
  mswHttp.get('/api/stores/closing-time', async () => {
    return HttpResponse.json<SuccessResponse<GetNextClosingTimeResponseDto>>(
      {
        success: true,
        message: '알림 시간 조회 성공',
        data: {
          nextClosingTime: '2026-02-19T09:00:00',
        },
      },
      { status: 200 },
    );
  }),
];

export const notificationHandler = [...getHandler];
