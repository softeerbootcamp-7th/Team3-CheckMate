import { POS_INTEGRATION_STEP } from '@/constants/onboarding/pos-integration';
import { usePosIntegration } from '@/hooks/onboarding/pos-integration';

import { PosIntegrationErrorSection } from '../pos-integration-error-section';
import { PosIntegrationGuideSection } from '../pos-integration-guide-section';
import { PosIntegrationLoadingSection } from '../pos-integration-loading-section';
import { PosIntegrationSuccessSection } from '../pos-integration-success-section';

export const PosIntegrationMain = () => {
  const { event } = usePosIntegration();
  switch (event?.data) {
    case POS_INTEGRATION_STEP.STARTED:
      return <PosIntegrationLoadingSection />;
    case POS_INTEGRATION_STEP.SUCCESS:
      return <PosIntegrationSuccessSection />;
    case POS_INTEGRATION_STEP.FAILURE:
      return <PosIntegrationErrorSection />;
    default:
      return <PosIntegrationGuideSection />;
  }
};
