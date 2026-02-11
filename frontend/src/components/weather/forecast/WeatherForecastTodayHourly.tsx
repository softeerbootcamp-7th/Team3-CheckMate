import { DefaultCardWrapper } from '@/components/shared';
import { mockHourlyForecastList } from '@/mocks/weather';

import { WeatherForecastHourItem } from './WeatherForecastHourItem';

export const WeatherForecastTodayHourly = () => {
  const hourlyForecastList = mockHourlyForecastList;
  return (
    <DefaultCardWrapper title="오늘 시간별 예보" className="w-175">
      <div className="flex flex-col gap-5">
        <div className="mt-4.5 flex flex-1">
          {hourlyForecastList.map((hourForecast) => {
            return (
              <WeatherForecastHourItem
                key={hourForecast.date.toISOString()}
                date={hourForecast.date}
                imgPath={hourForecast.imgPath}
                temperature={hourForecast.temperature}
              />
            );
          })}
        </div>
        <div className="h-6">그래프</div>
      </div>
    </DefaultCardWrapper>
  );
};
