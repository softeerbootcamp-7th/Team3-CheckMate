import { useLocation } from 'react-router-dom';

import { Spinner } from '@/components/shared';
import { CDN_BASE_URL, ROUTE_PATHS } from '@/constants/shared';

import { PosIntegrationLoadingFallback } from '../pos-integration-page';
import { StoreRegisterLoadingFallback } from '../store-register-page';

interface LoadingContentProps {
  pathname: string;
}

const LoadingContent = ({ pathname }: LoadingContentProps) => {
  const {
    ONBOARDING: {
      BASE: ONBOARDING_BASE,
      STORE: ONBOARDING_STORE,
      POS: ONBOARDING_POS,
    },
  } = ROUTE_PATHS;
  const onboardingStorePath = `${ONBOARDING_BASE}/${ONBOARDING_STORE}`;
  const onboardingPosPath = `${ONBOARDING_BASE}/${ONBOARDING_POS}`;

  if (pathname.startsWith(onboardingStorePath)) {
    return <StoreRegisterLoadingFallback />;
  }

  if (pathname.startsWith(onboardingPosPath)) {
    return <PosIntegrationLoadingFallback />;
  }

  return <Spinner className="size-5" />;
};

export const OnboardingLoadingFallback = () => {
  const { pathname } = useLocation();

  return (
    <div className="bg-special-card-bg flex size-full">
      <div className="bg-special-dashboard-bg h-full w-75">
        <object
          data={`${CDN_BASE_URL}/assets/images/logoWithTitle.svg`}
          className="mt-21 ml-10"
        />
      </div>
      <div className="flex h-full flex-1 justify-center gap-8.5 px-10 pt-8">
        <LoadingContent pathname={pathname} />
      </div>
    </div>
  );
};
