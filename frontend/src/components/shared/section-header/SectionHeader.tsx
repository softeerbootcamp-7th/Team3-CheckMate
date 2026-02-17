import { RefreshControl } from '../refresh-control';
import { SectionTitle } from '../section-title';

interface SectionHeaderProps {
  // sectionTitle 관련 props
  title: string; // 섹션의 제목
  description?: string; // 섹션에 대한 추가 설명

  // refreshControl 관련 props -> 새로고침된 시간, 새로고침 버튼
  lastUpdatedDate: Date | null; // 마지막으로 데이터가 새로고침된 시간
  onRefresh: () => void; // 새로고침 버튼 클릭 시 호출되는 함수
  isLoading: boolean; // 데이터가 새로고침 중인지 여부

  rightSlot?: React.ReactNode;
}

export const SectionHeader = ({
  title,
  description,
  lastUpdatedDate,
  onRefresh,
  isLoading,
  rightSlot,
}: SectionHeaderProps) => {
  return (
    <header className="flex justify-between gap-600">
      <div className="flex min-w-0 items-center gap-3">
        <SectionTitle title={title} description={description} />
        <RefreshControl
          lastUpdatedDate={lastUpdatedDate}
          onRefresh={onRefresh}
          isLoading={isLoading}
        />
      </div>
      {rightSlot}
    </header>
  );
};
