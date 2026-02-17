import { useCallback } from 'react';

import { PeriodSelect, SectionHeader } from '@/components/shared';
import { PERIOD_PRESET_KEYS } from '@/constants/shared';
import { useSectionRefresh } from '@/hooks/shared';
import { salesKeys } from '@/services/sales';

import { usePeriodTypeContext } from './period-type-provider';

export const SalesOverviewHeader = () => {
  const {
    periodType,
    setPeriodType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = usePeriodTypeContext();
  const { lastUpdatedDate, isFetching, refresh, updateLastUpdatedDateToNow } =
    useSectionRefresh({
      prefixKey: salesKeys.overview(), // 메출>매출현황 섹션에 해당되는 공통 쿼리 키는 ["sales", "overview"]
      initLastUpdatedNow: true, // 최초 진입 시 현재 시각 표시 여부 선택
    });
  // 기간 선택 변경했을 때 섹션 헤더의 마지막 업데이트 날짜를 현재 시각으로 업데이트하는 함수
  const handleSetPeriodType = useCallback(
    (selectedPeriodType: typeof periodType) => {
      updateLastUpdatedDateToNow();
      setPeriodType(selectedPeriodType);
    },
    [setPeriodType, updateLastUpdatedDateToNow],
  );

  return (
    <SectionHeader
      title="매출 현황"
      description="실제 매출과 주문 상황을 한눈에 확인해요."
      lastUpdatedDate={lastUpdatedDate}
      onRefresh={refresh}
      isLoading={isFetching}
      rightSlot={
        <PeriodSelect
          periodPreset={PERIOD_PRESET_KEYS.dayWeekMonth}
          periodType={periodType}
          startDate={startDate}
          endDate={endDate}
          setPeriodType={handleSetPeriodType}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      }
    />
  );
};
