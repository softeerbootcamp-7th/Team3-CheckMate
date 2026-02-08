import { WEATHER_AM_PM } from '@/constants/weather';
import type { WeatherForecastOneDayHalf } from '@/types/weather';
import { cn } from '@/utils/shared/';
import { formatDayLabel } from '@/utils/weather';

interface WeatherForecastOneDayAmPmItemProps {
  date: Date;
  am: WeatherForecastOneDayHalf;
  pm: WeatherForecastOneDayHalf;
}

export const WeatherForecastOneDayAmPmItem = ({
  date,
  am,
  pm,
}: WeatherForecastOneDayAmPmItemProps) => {
  const weekDayInfo = formatDayLabel(date);
  const halfList = [
    { label: WEATHER_AM_PM.am, ...am },
    { label: WEATHER_AM_PM.pm, ...pm },
  ] as const;

  return (
    <div className="text-grey-900 flex w-27.5 flex-col items-center gap-2">
      <span
        className={cn(
          weekDayInfo === '오늘'
            ? 'body-small-bold text-grey-900'
            : 'body-small-semibold text-grey-500',
        )}
      >
        {weekDayInfo}
      </span>
      <div className="flex gap-[6px]">
        {halfList.map(({ label, iconPath, temperature }) => {
          return (
            <div
              key={`${date.getDate()}-${label}`} // 날짜 + (오전 또는 오후)가  키가 됨
              className="flex flex-col items-center gap-1"
            >
              <span className="caption-large-medium text-grey-600">
                {label}
              </span>
              <img src={iconPath} className="size-10" />
              <span className="body-small-medium">{temperature}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
