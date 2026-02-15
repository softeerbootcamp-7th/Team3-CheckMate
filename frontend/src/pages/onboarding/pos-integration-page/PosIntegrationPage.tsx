import { PosIntegrationMain } from '@/components/onboarding/pos-integration';
import { OnboardingSidebar } from '@/components/onboarding/shared';
import { OnboardingLayout } from '@/components/shared';

// TODO: POS 연동 상태 따른 section 조건부 렌더링 필요

export const PosIntegrationPage = () => {
  return (
    <OnboardingLayout>
      <OnboardingLayout.Sidebar>
        <OnboardingSidebar />
      </OnboardingLayout.Sidebar>
      <OnboardingLayout.Main>
        <PosIntegrationMain />
      </OnboardingLayout.Main>
    </OnboardingLayout>
  );
};
