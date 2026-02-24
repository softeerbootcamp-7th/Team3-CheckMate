import {
  SignInFooterSection,
  SignInMainSection,
  SignInSidebar,
} from '@/components/auth';
import { OnboardingLayout } from '@/components/shared';

const SignInPage = () => {
  return (
    <OnboardingLayout>
      <OnboardingLayout.Sidebar>
        <SignInSidebar />
      </OnboardingLayout.Sidebar>
      <OnboardingLayout.Main>
        <SignInMainSection />
      </OnboardingLayout.Main>
      <OnboardingLayout.Footer>
        <SignInFooterSection />
      </OnboardingLayout.Footer>
    </OnboardingLayout>
  );
};

export default SignInPage;
