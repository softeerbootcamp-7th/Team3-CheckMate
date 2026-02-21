import { useEffect } from 'react';

import type { QueryKey } from '@tanstack/react-query';

import { useSectionRefresh } from '@/hooks/shared';

import { RefreshControl } from '../refresh-control';
import { SectionTitle } from '../section-title';

interface SectionHeaderProps {
  // sectionTitle 관련 props
  title: string; // 섹션의 제목
  description?: string; // 섹션에 대한 추가 설명

  // refreshControl 관련 props
  prefixKey: QueryKey;
  initLastUpdatedNow?: boolean; // 첫 렌더에서 지금 시각을 새로고침된 시간으로 보이게 할 지
  // 새로고침 시간 업데이트 트리거 시키는 용도의 변수. 이 값이 바뀌면 섹션헤더 내 새로고침 시간 업데이트됨
  triggerUpdateRefreshDate?: number;

  rightSlot?: React.ReactNode;
}

export const SectionHeader = ({
  title,
  description,
  prefixKey,
  initLastUpdatedNow,
  triggerUpdateRefreshDate,
  rightSlot,
}: SectionHeaderProps) => {
  const { lastUpdatedDate, isFetching, refresh, updateLastUpdatedDateToNow } =
    useSectionRefresh({
      prefixKey,
      initLastUpdatedNow,
    });

  useEffect(() => {
    if (!triggerUpdateRefreshDate) {
      return;
    }
    // 현재 시간을 '요청 시각'으로 찍기
    updateLastUpdatedDateToNow();
  }, [triggerUpdateRefreshDate, updateLastUpdatedDateToNow]);
  return (
    <header className="flex justify-between gap-600">
      <div className="flex min-w-0 items-center gap-3">
        <SectionTitle title={title} description={description} />
        <RefreshControl
          lastUpdatedDate={lastUpdatedDate}
          onRefresh={refresh}
          isLoading={isFetching}
        />
      </div>
      {rightSlot}
    </header>
  );
};
