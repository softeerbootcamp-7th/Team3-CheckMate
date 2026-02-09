import { ONE_HUNDRED_MILLION, TEN_THOUSAND } from '@/constants/shared';

export const formatNumber = (value: number) => {
  return value.toLocaleString('ko-KR');
};

export const formatNumberInTenThousands = (num: number) => {
  // 1억 이상이면 '억 원' 단위로 변환
  if (num >= ONE_HUNDRED_MILLION) {
    return (num / ONE_HUNDRED_MILLION).toFixed(1) + '억';
  }
  // '만 원' 단위로 변환
  return (num / TEN_THOUSAND).toFixed(1) + '만';
};
