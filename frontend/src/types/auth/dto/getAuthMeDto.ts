type OnboardingStatus = 'NONE' | 'REGISTERED_STORE' | 'COMPLETED';

interface UserInfo {
  id: number;
  name: string;
  email: string;
}

interface StoreInfo {
  storeId: number;
  storeName: string;
}
export interface GetAuthMeResponseDto {
  userInfo: UserInfo;
  onboardingStatus: OnboardingStatus;
  storeInfo: StoreInfo;
}
