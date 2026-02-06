import { useState } from 'react';

import { PeriodSelect, SectionTitle } from '@/components/shared';
import {
  PERIOD_PRESET_KEYS,
  PERIOD_PRESETS,
  type PeriodType,
} from '@/constants/shared';

import { ActualRevenue } from './ActualRevenue';
import { AverageRevenuePerOrder } from './AverageRevenuePerOrder';
import { DiscountCancel } from './DiscountCancel';
import { OrderCount } from './OrderCount';
import { TotalRevenue } from './TotalRevenue';

export const SalesOverview = () => {
  const [periodType, setPeriodType] = useState<
    PeriodType<typeof PERIOD_PRESET_KEYS.dayWeekMonth> | undefined
  >(PERIOD_PRESETS.dayWeekMonth.today);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <section aria-label="매출 현황">
      <header className="flex justify-between">
        <SectionTitle
          title="매출 현황"
          description="실제 매출과 주문 상황을 한눈에 확인해요."
        />
        <PeriodSelect
          periodPreset={PERIOD_PRESET_KEYS.dayWeekMonth}
          periodType={periodType}
          setPeriodType={setPeriodType}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </header>
      <section className="mt-4 grid gap-5">
        <div className="grid grid-cols-3 gap-5">
          <ActualRevenue
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
          />
          <OrderCount
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
          />
          <AverageRevenuePerOrder
            periodType={periodType}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
        <div className="flex gap-5">
          <TotalRevenue />
          <DiscountCancel />
        </div>
      </section>
    </section>
  );
};
