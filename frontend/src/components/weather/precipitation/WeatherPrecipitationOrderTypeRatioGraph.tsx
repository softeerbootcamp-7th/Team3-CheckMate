interface WeatherPrecipitationOrderTypeRatioGraphProps {
  graphTitle: string;
  deliveryPercentage: number;
  takeoutPercentage: number;
  hallPercentage: number;
}

export const WeatherPrecipitationOrderTypeRatioGraph = ({
  graphTitle,
  deliveryPercentage,
  takeoutPercentage,
  hallPercentage,
}: WeatherPrecipitationOrderTypeRatioGraphProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="body-small-bold text-grey-900">{graphTitle}</span>
      <div className="flex flex-col gap-1">
        <p className="bg-brand-400 h-3" />
        <div className="body-small-medium text-grey-600 flex justify-between">
          <span>배달 {deliveryPercentage}%</span>
          <span>홀 {hallPercentage}%</span>
          <span>포장 {takeoutPercentage}%</span>
        </div>
      </div>
    </div>
  );
};
