import { DefaultCardWrapper } from '@/components/shared';
import { mockPrecipitationInsight } from '@/mocks/precipitation';

export const WeatherPrecipitationInsight = () => {
  const { mainText, subText } = mockPrecipitationInsight;
  return (
    <DefaultCardWrapper title="강수 인사이트" width={340} height={228}>
      <div className="flex flex-col">
        <p className="title-large-semibold whitespace-pre-wrap">{subText}</p>
        <p className="body-small-medium text-grey-600 mt-[6px] whitespace-pre-wrap">
          {mainText}
        </p>
      </div>
    </DefaultCardWrapper>
  );
};
