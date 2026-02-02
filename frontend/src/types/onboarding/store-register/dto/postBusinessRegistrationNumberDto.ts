import type { StoreRegisterForm } from '../storeRegisterForm';

export interface PostBusinessRegistrationNumberRequestDto {
  businessRegistrationNumber: StoreRegisterForm['businessRegistrationNumber'];
}

export interface PostBusinessRegistrationNumberResponseDto {
  businessAuthToken: StoreRegisterForm['businessAuthToken'];
}
