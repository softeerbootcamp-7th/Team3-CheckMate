import { HttpResponse, passthrough } from 'msw';

import type { SuccessResponse } from '@/services/shared';
import type {
  PostBusinessRegistrationNumberResponseDto,
  PostStoreRegisterRequestDto,
} from '@/types/onboarding/store-register';

import { mockDb } from '../../data';
import { mswHttp } from '../../shared';

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
  mswHttp.post<null, PostStoreRegisterRequestDto>('/api/stores', () => {
    mockDb.hasStore = true;
    return HttpResponse.json(
      {
        success: true,
        message: 'Success',
        data: null,
      },
      { status: 201 },
    );
  }),
];

export const storeRegisterHandler = [...postHandler];
