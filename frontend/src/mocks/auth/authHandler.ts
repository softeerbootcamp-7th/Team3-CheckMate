import { HttpResponse, passthrough } from 'msw';

import { type ErrorResponse, type SuccessResponse } from '@/services/shared';
import type {
  GetAuthMeResponseDto,
  PostAuthRefreshResponseDto,
} from '@/types/auth';

import { mswHttp } from '../shared';

const getHandler = [
  mswHttp.get('/auth/me', ({ request }) => {
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
    return HttpResponse.json<SuccessResponse<GetAuthMeResponseDto>>(
      {
        success: true,
        message: 'Success',
        data: {
          userInfo: {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
          },
          onboardingStatus: 'NONE',
          storeInfo: {
            storeId: 1,
            storeName: 'Mock Store',
          },
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
