import { SignInMainSection, SignInSidebar } from '@/components/auth';
import { OnboardingLayout } from '@/components/shared';

export const SignInPage = () => {
  return (
    <OnboardingLayout>
      <OnboardingLayout.Sidebar>
        <SignInSidebar />
      </OnboardingLayout.Sidebar>
      <OnboardingLayout.Main>
        <SignInMainSection />
      </OnboardingLayout.Main>
    </OnboardingLayout>
  );
};
