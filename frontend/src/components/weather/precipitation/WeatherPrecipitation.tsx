import { SectionTitle } from '@/components/shared';

import { WeatherPrecipitationChange } from './WeatherPrecipitationChange';
import { WeatherPrecipitationInsight } from './WeatherPrecipitationInsight';
import { WeatherPrecipitationOrderTypeRatio } from './WeatherPrecipitationOrderTypeRatio';

export const WeatherPrecipitation = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      <header className="flex justify-between">
        <SectionTitle
          title="강수영향도"
          description="강수량에 따라 운영 전략을 짜보세요."
        />
        <span className="body-small-medium text-grey-500">최근 365일 기준</span>
      </header>

      <section className="flex gap-5">
        <WeatherPrecipitationInsight />
        <WeatherPrecipitationOrderTypeRatio />
        <WeatherPrecipitationChange />
      </section>
    </section>
  );
};
