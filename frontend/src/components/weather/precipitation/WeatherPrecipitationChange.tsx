import { CircleArrowRight } from 'lucide-react';

import { DefaultCardWrapper } from '@/components/shared';
import { mockPrecipitationChange } from '@/mocks/precipitation';

import { WeatherPrecipitationChangeItem } from './WeatherPrecipitationChangeItem';

export const WeatherPrecipitationChange = () => {
  const { description, ordersChangePercentage, salesChangePercentage } =
    mockPrecipitationChange;
  return (
    <DefaultCardWrapper title="강수 주문수 및 매출 변화">
      <div className="flex flex-col gap-10">
        <div className="mt-8 flex h-18.5 w-full justify-center gap-7">
          <WeatherPrecipitationChangeItem
            title="평균 주문수"
            percentage={ordersChangePercentage}
          />
          <div className="bg-grey-300 h-full w-px" />
          <WeatherPrecipitationChangeItem
            title="평균 매출"
            percentage={salesChangePercentage}
          />
        </div>
        <p className="body-small-medium text-grey-900 flex items-center gap-1">
          <CircleArrowRight className="size-5" />
          {description}
        </p>
      </div>
    </DefaultCardWrapper>
  );
};
