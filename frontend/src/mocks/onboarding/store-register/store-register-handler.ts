import { HttpResponse, passthrough } from 'msw';

import { mswHttp } from '@/mocks/shared';
import type { SuccessResponse } from '@/services/shared';
import type { PostBusinessRegistrationNumberResponseDto } from '@/types/onboarding/store-register';

const postHandler = [
  mswHttp.post('/api/stores/business/verify', () => {
    return passthrough();
    return HttpResponse.json<
      SuccessResponse<PostBusinessRegistrationNumberResponseDto>
    >(
      {
        success: true,
        message: 'Success',
        data: { businessAuthToken: 'mock-business-auth-token' },
      },
      { status: 201 },
    );
  }),
];

export const storeRegisterHandler = [...postHandler];
