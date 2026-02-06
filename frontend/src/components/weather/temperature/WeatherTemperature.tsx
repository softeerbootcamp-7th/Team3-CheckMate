import { SectionTitle } from '@/components/shared';

import { WeatherTemperatureAOC } from './WeatherTemperatureAOC';
import { WeatherTemperatureAOV } from './WeatherTemperatureAOV';

export const WeatherTemperature = () => {
  return (
    <section className="flex w-full flex-col gap-4">
      <header className="flex justify-between">
        <SectionTitle
          title="기온별 분석"
          description="기온 구간별로 평균 주문수와 객단가를 비교해, 우리 매장이 어떤 날에 더 잘 팔리는지 확인해요."
        />
        <span className="body-small-medium text-grey-500">최근 365일 기준</span>
      </header>

      <section className="flex gap-5">
        <WeatherTemperatureAOV />
        <WeatherTemperatureAOC />
      </section>
    </section>
  );
};
