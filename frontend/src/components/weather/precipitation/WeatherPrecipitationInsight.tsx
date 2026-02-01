import { DefaultCardWrapper } from '@/components/shared';
import { mockPrecipitationInsight } from '@/mocks/precipitation';

export const WeatherPrecipitationInsight = () => {
  const { mainText, subText } = mockPrecipitationInsight;
  return (
    <DefaultCardWrapper title="강수 인사이트" width={340} height={228}>
      <div className="flex flex-col">
        <p className="title-large-semibold break-keep">{subText}</p>
        <p className="body-small-medium mt-[6px] break-keep text-gray-600">
          {mainText}
        </p>
      </div>
    </DefaultCardWrapper>
  );
};
