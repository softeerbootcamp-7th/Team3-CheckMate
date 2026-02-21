import { useLocation } from 'react-router-dom';

import { Spinner } from '@/components/shared';
import { CDN_BASE_URL, ROUTE_PATHS } from '@/constants/shared';

import { PosIntegrationLoadingFallback } from '../pos-integration-page';
import { StoreRegisterLoadingFallback } from '../store-register-page';

interface LoadingContentProps {
  pathname: string;
}

const LoadingContent = ({ pathname }: LoadingContentProps) => {
  if (pathname.includes(ROUTE_PATHS.ONBOARDING.STORE)) {
    return <StoreRegisterLoadingFallback />;
  }

  if (pathname.includes(ROUTE_PATHS.ONBOARDING.POS)) {
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
