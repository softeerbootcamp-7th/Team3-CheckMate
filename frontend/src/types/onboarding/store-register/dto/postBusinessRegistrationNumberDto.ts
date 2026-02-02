import type { StoreRegisterForm } from '../storeRegisterForm';

export type PostBusinessRegistrationNumberRequestDto = {
  businessRegistrationNumber: StoreRegisterForm['businessRegistrationNumber'];
};

export type PostBusinessRegistrationNumberResponseDto = {
  businessAuthToken: StoreRegisterForm['businessAuthToken'];
};
