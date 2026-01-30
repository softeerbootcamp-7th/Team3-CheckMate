import { OnboardingSidebar } from '@/components/onboarding/shared';
import {
  StoreRegisterForm,
  StoreRegisterStepper,
  StoreRegisterStepProvider,
} from '@/components/onboarding/store-register';
import { OnboardingLayout } from '@/components/shared';

export const StoreRegisterPage = () => {
  return (
    <StoreRegisterStepProvider>
      <OnboardingLayout>
        <OnboardingLayout.Sidebar>
          <OnboardingSidebar>
            <StoreRegisterStepper />
          </OnboardingSidebar>
        </OnboardingLayout.Sidebar>
        <OnboardingLayout.Main>
          <StoreRegisterForm />
        </OnboardingLayout.Main>
      </OnboardingLayout>
    </StoreRegisterStepProvider>
  );
};
