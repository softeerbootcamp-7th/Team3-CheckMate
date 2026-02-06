import { authorizedApi } from '@/services/shared';
import type {
  PostBusinessRegistrationNumberRequestDto,
  PostBusinessRegistrationNumberResponseDto,
  PostStoreRegisterRequestDto,
} from '@/types/onboarding/store-register';

export const postBusinessRegistrationNumber = async (
  dto: PostBusinessRegistrationNumberRequestDto,
) => {
  const { data } =
    await authorizedApi.post<PostBusinessRegistrationNumberResponseDto>(
      '/api/stores/business/verify',
      {
        body: JSON.stringify(dto),
      },
    );

  return data;
};

export const postStoreRegister = async (dto: PostStoreRegisterRequestDto) => {
  const { data } = await authorizedApi.post('/api/stores', {
    body: JSON.stringify(dto),
  });

  return data;
};
