import {
  SettingMyStoreInfo,
  SettingOption,
  SignOutButton,
} from '@/components/setting';
import { DefaultCardFetchBoundary } from '@/components/shared';

export const SettingPage = () => {
  return (
    <div className="mt-20 flex flex-col gap-8 pb-29.5">
      <span className="title-large-semibold text-grey-900">환경설정</span>
      {/* 내 매장 정보 섹션 */}
      <DefaultCardFetchBoundary cardWidth={1040} cardHeight={516}>
        <SettingMyStoreInfo />
      </DefaultCardFetchBoundary>

      <div className="flex gap-10">
        {/* 메뉴, 식재료 섹션 */}
        <SettingOption
          optionName="메뉴/식재료"
          linkTo="/settings/ingredient"
          optionDescription="식재료 관리"
        />
        {/* 계정 보안 섹션 */}
        <SettingOption optionName="계정 보안">
          <SignOutButton />
        </SettingOption>
      </div>
    </div>
  );
};
