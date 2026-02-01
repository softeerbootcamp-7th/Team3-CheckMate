import { DefaultCardWrapper } from '@/components/shared/default-card-wrapper';
import { mockPrecipitationOrderTypeRatio } from '@/mocks/precipitation';

import { WeatherPrecipitationOrderTypeRatioGraph } from './WeatherPrecipitationOrderTypeRatioGraph';

export const WeatherPrecipitationOrderTypeRatio = () => {
  const { graphs: orderTypeRatioData } = mockPrecipitationOrderTypeRatio;
  return (
    <DefaultCardWrapper
      title="판매유형별 주문건수 비율"
      width={340}
      height={228}
    >
      <div className="flex flex-col gap-2.5">
        {orderTypeRatioData.map((data) => {
          return (
            <WeatherPrecipitationOrderTypeRatioGraph
              key={data.graphTitle}
              graphTitle={data.graphTitle}
              deliveryPercentage={data.deliveryPercentage}
              hallPercentage={data.hallPercentage}
              takeoutPercentage={data.takeoutPercentage}
            />
          );
        })}
      </div>
    </DefaultCardWrapper>
  );
};
