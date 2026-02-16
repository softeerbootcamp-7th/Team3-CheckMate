import { SectionHeader } from '@/components/shared';

import { WeatherForecastToday } from './WeatherForecastToday';
import { WeatherForecastTodayHourly } from './WeatherForecastTodayHourly';
import { WeatherForecastWeekly } from './WeatherForecastWeekly';

export const WeatherForecast = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      <SectionHeader
        title="날씨예보"
        description="날씨를 보고 앞으로의 운영 전략을 짜보세요."
        lastUpdatedDate={new Date()}
        onRefresh={() => {}}
        isLoading={false}
      />

      <section className="flex flex-col gap-5">
        <div className="flex gap-5">
          <WeatherForecastToday />
          <WeatherForecastTodayHourly />
        </div>

        <WeatherForecastWeekly />
      </section>
    </section>
  );
};
