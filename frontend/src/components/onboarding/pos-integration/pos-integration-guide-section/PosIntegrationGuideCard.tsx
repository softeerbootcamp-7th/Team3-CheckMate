import type { PosIntegrationGuideCard as PosIntegrationGuideCardType } from '@/constants/onboarding/pos-integration';
import { CDN_BASE_URL } from '@/constants/shared';

interface PosIntegrationGuideCardProps {
  stepCount: number;
  path: PosIntegrationGuideCardType['path'];
  description: PosIntegrationGuideCardType['description'];
}

export const PosIntegrationGuideCard = ({
  stepCount,
  path,
  description,
}: PosIntegrationGuideCardProps) => {
  return (
    <div className="rounded-200 bg-grey-100 flex h-49 w-85 flex-col items-center gap-5.5 pt-6">
      <span className="rounded-100 bg-special-card-bg body-large-semibold text-brand-main flex size-7.5 items-center justify-center">
        {stepCount}
      </span>
      <div className="flex flex-col items-center gap-2">
        <img
          src={`${CDN_BASE_URL}${path}`}
          alt={description}
          className="size-12"
        />
        <p className="body-medium-medium text-grey-900 text-center whitespace-pre-wrap">
          {description}
        </p>
      </div>
    </div>
  );
};
