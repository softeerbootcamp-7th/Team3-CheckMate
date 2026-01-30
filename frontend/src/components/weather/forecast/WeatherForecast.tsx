import { SectionTitle } from '@/components/shared';
import { DefaultCardWrapper } from '@/components/shared/default-card-wrapper';
import {
  mockHourlyForecastList,
  mockOneDayAmPmForecastList,
  mockTodayForecastData,
} from '@/mocks/weather';

import { WeatherForecastToday } from './WeatherForecastToday';
import { WeatherForecastTodayHourly } from './WeatherForecastTodayHourly';
import { WeatherForecastWeekly } from './WeatherForecastWeekly';

export const WeatherForecast = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      <SectionTitle
        title="날씨예보"
        description="날씨를 보고 앞으로의 운영 전략을 짜보세요."
      />

      <section className="flex flex-col gap-5">
        <div className="flex gap-5">
          <DefaultCardWrapper title="오늘 날씨 예보" width={340} height={228}>
            <WeatherForecastToday
              mainText={mockTodayForecastData.mainText}
              subText={mockTodayForecastData.subText}
              weatherAlert={mockTodayForecastData.weatherAlert}
            />
          </DefaultCardWrapper>
          <DefaultCardWrapper title="오늘 시간별 예보" height={228} width={700}>
            <WeatherForecastTodayHourly
              hourlyForecastList={mockHourlyForecastList}
            />
          </DefaultCardWrapper>
        </div>

        <div>
          <DefaultCardWrapper title="주간 날씨 예보" width={1060} height={228}>
            <WeatherForecastWeekly
              oneDayAmPmForecastList={mockOneDayAmPmForecastList}
            />
          </DefaultCardWrapper>
        </div>
      </section>
    </section>
  );
};
