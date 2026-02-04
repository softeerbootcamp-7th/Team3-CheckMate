import { STORE_NAME } from '@/constants/onboarding/store-register';

export const validateStoreName = (value: string) => {
  if (!value) {
    return '매장명을 입력해주세요.';
  }

  if (value.length > STORE_NAME.MAX_LENGTH) {
    return `매장명은 ${STORE_NAME.MAX_LENGTH}자 이내로 입력해주세요.`;
  }

  return true;
};
