import { PosIntegrationGuideSection } from '@/components/onboarding/pos-integration';
import { OnboardingSidebar } from '@/components/onboarding/shared';
import { OnboardingLayout } from '@/components/shared';

export const PosIntegrationPage = () => {
  return (
    <OnboardingLayout>
      <OnboardingLayout.Sidebar>
        <OnboardingSidebar />
      </OnboardingLayout.Sidebar>
      <OnboardingLayout.Main>
        <PosIntegrationGuideSection />
      </OnboardingLayout.Main>
    </OnboardingLayout>
  );
};
