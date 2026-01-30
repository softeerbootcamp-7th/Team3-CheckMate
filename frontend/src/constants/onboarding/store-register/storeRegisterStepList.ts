import { STORE_REGISTER_STEP } from './storeRegisterStep';

export const STORE_REGISTER_STEP_LIST = [
  {
    step: STORE_REGISTER_STEP.BUSINESS_REGISTRATION_NUMBER,
    label: '사업자 확인',
  },
  {
    step: STORE_REGISTER_STEP.STORE_INFORMATION,
    label: '매장 정보 입력',
  },
  {
    step: STORE_REGISTER_STEP.STORE_BUSINESS_HOURS,
    label: '영업시간 입력',
  },
] as const;
