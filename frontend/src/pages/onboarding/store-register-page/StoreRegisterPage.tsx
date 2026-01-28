import {
  StoreRegisterForm,
  StoreRegisterSidebar,
} from '@/components/onboarding/store-register';
import { OnboardingLayout } from '@/components/shared';

export const StoreRegisterPage = () => {
  return (
    <OnboardingLayout>
      <OnboardingLayout.Sidebar>
        <StoreRegisterSidebar />
      </OnboardingLayout.Sidebar>
      <OnboardingLayout.Main>
        <StoreRegisterForm />
      </OnboardingLayout.Main>
    </OnboardingLayout>
  );
};
