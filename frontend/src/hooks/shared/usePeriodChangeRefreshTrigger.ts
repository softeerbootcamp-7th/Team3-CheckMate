import { useState } from 'react';

interface UsePeriodChangeRefreshTriggerProps<T> {
  setPeriodType: (value: T) => void;
}

// 기간 선택 변경하면 섹션 헤더의 마지막 새로고침 시간 업데이트하도록 트리거 시키는 용도의 훅
export const usePeriodChangeRefreshTrigger = <T>({
  setPeriodType,
}: UsePeriodChangeRefreshTriggerProps<T>) => {
  const [triggerUpdateRefreshDate, setTriggerUpdateRefreshDate] = useState(0);

  // 기간을 변경시킬 때 새로고침 시간 트리거 변수를 +1로 변경해줘서 섹션헤더에서 새로고침 시간 업데이트 되도록
  const handlePeriodChange = (selectedPeriodType: T) => {
    setTriggerUpdateRefreshDate((prev) => prev + 1);
    setPeriodType(selectedPeriodType);
  };

  return {
    triggerUpdateRefreshDate,
    handlePeriodChange,
  };
};
