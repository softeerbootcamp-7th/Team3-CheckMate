import { SectionHeader } from '@/components/shared';

import { WeatherPrecipitationChange } from './WeatherPrecipitationChange';
import { WeatherPrecipitationInsight } from './WeatherPrecipitationInsight';
import { WeatherPrecipitationOrderTypeRatio } from './WeatherPrecipitationOrderTypeRatio';

export const WeatherPrecipitation = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      <SectionHeader
        title="강수영향도"
        description="강수량에 따라 운영 전략을 짜보세요."
        lastUpdatedDate={new Date()}
        onRefresh={() => {}}
        isLoading={false}
      />

      <section className="flex gap-5">
        <WeatherPrecipitationInsight />
        <WeatherPrecipitationOrderTypeRatio />
        <WeatherPrecipitationChange />
      </section>
    </section>
  );
};
