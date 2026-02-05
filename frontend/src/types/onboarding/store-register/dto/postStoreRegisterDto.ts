import type { StoreRegisterForm } from '../storeRegisterForm';

export type PostStoreRegisterRequestDto = Omit<
  StoreRegisterForm,
  'businessRegistrationNumber'
>;
