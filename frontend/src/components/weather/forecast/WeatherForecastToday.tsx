interface WeatherForecastTodayProps {
  mainText: string;
  subText: string;
  weatherAlert?: {
    iconPath: string;
    message: string;
  };
}

export const WeatherForecastToday = ({
  mainText,
  subText,
  weatherAlert,
}: WeatherForecastTodayProps) => {
  return (
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
  );
};
