import { StoreNameInput } from '@/components/onboarding/store-register';
import { useInitializeStoreName } from '@/hooks/setting/useInitializeStoreName';

interface SettingMyStoreNameProps {
  storeName: string;
}

export const SettingMyStoreName = ({ storeName }: SettingMyStoreNameProps) => {
  // 서버에서 받아온 값으로 RHF 폼 값을 초기화(덮어쓰기)
  useInitializeStoreName({ storeName });
  // 처음 환경설정 창 들어가면 매장명 입력란에 focus가서 커서 깜빡거리는 문제 발생
  // readOnly 속성 추가하여 읽기 전용으로 변경
  return <StoreNameInput readOnly />;
};
