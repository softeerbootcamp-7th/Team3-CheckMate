import { cn } from '@/utils/shared';
import { formatHourlyTimeLabel } from '@/utils/weather';

interface WeatherForecastHourItemProps {
  date: Date;
  imgPath: string;
  temperature: number;
}

export const WeatherForecastHourItem = ({
  date,
  imgPath,
  temperature,
}: WeatherForecastHourItemProps) => {
  const timeLabel = formatHourlyTimeLabel(date);
  return (
    <div
      className={cn(
        timeLabel === '지금'
          ? 'body-small-bold text-grey-900'
          : 'body-small-medium text-grey-500',
        'flex flex-1 flex-col items-center',
      )}
    >
      <span>{timeLabel}</span>
      <div className="mt-3 flex flex-col items-center gap-1">
        <img src={imgPath} className="size-10" />
        <span>{temperature}°</span>
      </div>
    </div>
  );
};
