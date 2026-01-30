import { SectionTitle } from '@/components/shared';
import { mockPrecipitationInsight } from '@/mocks/precipitation';

import { WeatherPrecipitationChangeCard } from './WeatherPrecipitationChangeCard';
import { WeatherPrecipitationInsightCard } from './WeatherPrecipitationInsightCard';
import { WeatherPrecipitationOrderTypeRatioCard } from './WeatherPrecipitationOrderTypeRatioCard';

export const WeatherPrecipitation = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      <header className="flex justify-between">
        <SectionTitle
          title="강수영향도"
          description="강수량에 따라 운영 전략을 짜보세요."
        />
        <span className="body-small-medium text-gray-500">최근 365일 기준</span>
      </header>

      <section className="flex gap-5">
        <WeatherPrecipitationInsightCard
          mainText={mockPrecipitationInsight.mainText}
          subText={mockPrecipitationInsight.subText}
        />
        <WeatherPrecipitationOrderTypeRatioCard />
        <WeatherPrecipitationChangeCard />
      </section>
    </section>
  );
};
