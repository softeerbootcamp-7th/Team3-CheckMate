interface WeatherPrecipitationChangeItemProps {
  title: string;
  percentage: number;
}

export const WeatherPrecipitationChangeItem = ({
  title,
  percentage,
}: WeatherPrecipitationChangeItemProps) => {
  return (
    <div className="flex w-24.5 flex-col gap-px">
      <p className="body-medium-semibold text-center">{title}</p>
      <p className="number-semibold-40 text-center">
        {percentage}
        <span className="number-semibold-28">%</span>
      </p>
    </div>
  );
};
