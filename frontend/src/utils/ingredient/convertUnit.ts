import type { Ingredient } from '@/types/ingredient';

// 서버에서 보내주는 식자재 단위를 UI에서 사용하는 단위로 변환하는 매핑 객체
export const convertServerUnitToUiUnit = (unit: Ingredient['unit']): string => {
  if (unit === 'L') {
    // L인 경우는 대문자 그대로 반환
    return 'L';
  }
  return unit.toLowerCase();
};
