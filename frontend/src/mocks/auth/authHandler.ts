import { HttpResponse, passthrough } from 'msw';

import { type ErrorResponse, type SuccessResponse } from '@/services/shared';
import type {
  GetAuthStatusResponseDto,
  PostAuthRefreshResponseDto,
} from '@/types/auth';

import { mockDb } from '../data';
import { mswHttp } from '../shared';

const getHandler = [
  mswHttp.get('/auth/status', ({ request }) => {
    // access token 갱신 테스트를 위해 첫 요청은 401 응답
    if (request.headers.get('Authorization') === null) {
      return HttpResponse.json<ErrorResponse>(
        {
          success: false,
          message: 'Unauthorized',
          errorCode: 'UNAUTHORIZED',
        },
        { status: 401 },
      );
    }
    return HttpResponse.json<SuccessResponse<GetAuthStatusResponseDto>>(
      {
        success: true,
        message: 'Success',
        data: {
          email: 'john.doe@example.com',
          hasStore: mockDb.hasStore,
          hasPosIntegration: mockDb.hasPosIntegration,
        },
      },
      {
        status: 200,
      },
    );
  }),
];

const postHandler = [
  mswHttp.post('/auth/refresh', () => {
    HttpResponse.json<SuccessResponse<PostAuthRefreshResponseDto>>(
      {
        success: true,
        message: 'Success',
        data: { accessToken: 'mock-access-token' },
      },
      { status: 200 },
    );
    return passthrough();
  }),
];

export const authHandler = [...getHandler, ...postHandler];
