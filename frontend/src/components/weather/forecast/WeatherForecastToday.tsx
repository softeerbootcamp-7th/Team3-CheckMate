import { DefaultCardWrapper } from '@/components/shared';
import { mockTodayForecastData } from '@/mocks/weather';

export const WeatherForecastToday = () => {
  const { mainText, subText, weatherAlert } = mockTodayForecastData;
  return (
    <DefaultCardWrapper title="오늘 날씨 예보" width={340} height={228}>
      <div className="flex flex-col gap-[6px]">
        {weatherAlert && (
          <div className="absolute top-5 right-5 flex flex-col items-center">
            <img src={weatherAlert.iconPath} className="size-15" />
            <span className="body-small-semibold text-grey-900">
              {weatherAlert.message}
            </span>
          </div>
        )}
        <div className="title-large-semibold break-keep">{mainText}</div>
        <span className="body-small-medium text-grey-600 pr-6 break-keep">
          {subText}
        </span>
      </div>
    </DefaultCardWrapper>
  );
};
