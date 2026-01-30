import { DefaultCardWrapper } from '@/components/shared/default-card-wrapper';
import type { WeatherForecastHour } from '@/types/weather';

import { WeatherForecastHourItem } from './WeatherForecastHourItem';

interface WeatherForecastTodayHourlyCardProps {
  hourlyForecastList: WeatherForecastHour[];
}

export const WeatherForecastTodayHourly = ({
  hourlyForecastList,
}: WeatherForecastTodayHourlyCardProps) => {
  return (
    <DefaultCardWrapper title="오늘 시간별 예보" height={228} width={700}>
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
