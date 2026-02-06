import { WeatherForecast } from '@/components/weather/forecast';
import { WeatherPrecipitation } from '@/components/weather/precipitation';
import { WeatherTemperature } from '@/components/weather/temperature';

export const WeatherPage = () => {
  return (
    <div className="mt-32.5 flex flex-col gap-13">
      <WeatherForecast />
      <WeatherPrecipitation />
      <WeatherTemperature />
    </div>
  );
};
