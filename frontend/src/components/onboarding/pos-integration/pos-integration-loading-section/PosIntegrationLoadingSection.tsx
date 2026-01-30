import { Spinner } from '@/components/shared';

import { PosIntegrationWarningBanner } from './PosIntegrationWarningBanner';

export const PosIntegrationLoadingSection = () => {
  return (
    <section className="flex size-full flex-col items-center gap-85 pt-94.5">
      <div className="flex flex-col items-center gap-3">
        <Spinner className="text-brand-500 size-10" />
        <p className="headline-small-semibold text-brand-main">
          POS 연동 요청을 확인하고 있어요
        </p>
      </div>
      <PosIntegrationWarningBanner />
    </section>
  );
};
