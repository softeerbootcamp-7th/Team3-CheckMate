import { DefaultCardWrapper } from '@/components/shared';
import { mockOneDayAmPmForecastList } from '@/mocks/weather';

import { WeatherForecastOneDayAmPmItem } from './WeatherForecastOneDayAmPmItem';

export const WeatherForecastWeekly = () => {
  const oneDayAmPmForecastList = mockOneDayAmPmForecastList;
  return (
    <DefaultCardWrapper title="주간 날씨 예보" width={1060} height={228}>
      <div className="mb-4 flex justify-between">
        {oneDayAmPmForecastList.map((oneDayAmPmForecast) => {
          return (
            <WeatherForecastOneDayAmPmItem
              key={oneDayAmPmForecast.date.toISOString()}
              date={oneDayAmPmForecast.date}
              am={oneDayAmPmForecast.am}
              pm={oneDayAmPmForecast.pm}
            />
          );
        })}
      </div>
    </DefaultCardWrapper>
  );
};
