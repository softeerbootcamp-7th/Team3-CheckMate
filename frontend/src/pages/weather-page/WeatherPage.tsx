import { WeatherForecast } from '@/components/weather';

export const WeatherPage = () => {
  return (
    <div className="mt-32.5 flex flex-col gap-13">
      <WeatherForecast />
    </div>
  );
};
