export interface WeatherPrecipitationInsightCardProps {
  subText: string;
  mainText: string;
}
export const WeatherPrecipitationInsightCard = ({
  subText,
  mainText,
}: WeatherPrecipitationInsightCardProps) => {
  return (
    <article className="bg-special-card-bg rounded-400 flex h-57 flex-1 flex-col justify-between p-5">
      <h3 className="body-medium-semibold gray-700">강수 인사이트</h3>
      <div className="flex flex-col">
        <p className="title-large-semibold break-keep">{subText}</p>
        <p className="body-small-medium mt-[6px] break-keep text-gray-600">
          {mainText}
        </p>
      </div>
    </article>
  );
};
