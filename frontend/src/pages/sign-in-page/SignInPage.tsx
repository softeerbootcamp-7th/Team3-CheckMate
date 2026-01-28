import { OnboardingLayout } from '@/components/shared';
import { SignInMainSection, SignInSidebar } from '@/components/sign-in';

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
