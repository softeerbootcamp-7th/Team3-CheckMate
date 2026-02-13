import { DashboardIngredientRankingCard } from '@/components/dashboard/dashboard-menu/DashboardIngredientRankingCard';
import { DashboardMenuOrderCount } from '@/components/dashboard/dashboard-menu/DashboardMenuOrderCount';
import { DashBoardMenuRankingCard } from '@/components/dashboard/dashboard-menu/DashboardMenuRankingCard';
import { SettingMyStoreInfo, SettingOption } from '@/components/setting';
import { DefaultCardFetchBoundary } from '@/components/shared/default-card-fetch-boundary/DefaultCardFetchBoundary';

export const SettingPage = () => {
  return (
    <div className="mt-20 flex flex-col gap-8 pb-29.5">
      <DashBoardMenuRankingCard />
      <DashboardIngredientRankingCard />
      <DashboardMenuOrderCount />
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
        <SettingOption
          optionName="계정 보안"
          linkTo="/logout"
          optionDescription="로그아웃"
        />
      </div>
    </div>
  );
};
