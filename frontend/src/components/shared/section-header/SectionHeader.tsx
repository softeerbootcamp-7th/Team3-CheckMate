import type { PeriodPresetType } from '@/constants/shared';

import { PeriodSelect, type PeriodSelectProps } from '../period-select';
import { RefreshControl } from '../refresh-control';
import { SectionTitle } from '../section-title';

interface SectionHeaderProps<T extends PeriodPresetType> {
  // sectionTitle 관련 props
  title: string; // 섹션의 제목
  description?: string; // 섹션에 대한 추가 설명

  // refreshControl 관련 props -> 새로고침된 시간, 새로고침 버튼
  lastUpdatedDate: Date; // 마지막으로 데이터가 새로고침된 시간
  onRefresh: () => void; // 새로고침 버튼 클릭 시 호출되는 함수
  isLoading: boolean; // 데이터가 새로고침 중인지 여부

  // periodSelect 관련 props
  periodSelectProps?: PeriodSelectProps<T>;
}

export const SectionHeader = <T extends PeriodPresetType>({
  title,
  description,
  lastUpdatedDate,
  onRefresh,
  isLoading,
  periodSelectProps,
}: SectionHeaderProps<T>) => {
  return (
    <header className="flex justify-between">
      <div className="flex items-center gap-3">
        <SectionTitle title={title} description={description} />
        <RefreshControl
          lastUpdatedDate={lastUpdatedDate}
          onRefresh={onRefresh}
          isLoading={isLoading}
        />
      </div>

      {/* PeriodSelect가 없는 섹션도 있기 때문에 PeriodSelectProps가 존재할 때만 PeriodSelect 컴포넌트 렌더링 */}
      {periodSelectProps && <PeriodSelect {...periodSelectProps} />}
    </header>
  );
};
