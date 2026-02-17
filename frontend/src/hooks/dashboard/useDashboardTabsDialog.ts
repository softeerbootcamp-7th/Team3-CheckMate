import { useEffect, useRef, useState } from 'react';

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';

import { DASHBOARD_TABS_DIALOG_MODE } from '@/constants/dashboard';
import {
  dashboardOptions,
  deleteDashboard,
  patchDashboardName,
  postDashboard,
} from '@/services/dashboard';
import type {
  DeleteDashboardQuery,
  PatchDashboardNameQuery,
  PatchDashboardNameRequestDto,
  PostDashboardRequestDto,
} from '@/types/dashboard';

import { useDashboardTabsContext } from '.';

export const useDashboardTabsDialog = () => {
  const queryClient = useQueryClient();
  const { data: tabs } = useSuspenseQuery(dashboardOptions.list);

  const { dialogMode, closeDialog, currentDashboardId, setCurrentDashboardId } =
    useDashboardTabsContext();

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [newTabs, setNewTabs] = useState<(string | undefined)[]>(
    tabs.map((tab) => tab.name),
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(
    dialogMode === DASHBOARD_TABS_DIALOG_MODE.ADD ? tabs.length : null,
  );
  const [isDeleted, setIsDeleted] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  // 편집 모드 진입 시 포커스 설정
  useEffect(() => {
    if (editingIndex === null) {
      return;
    }
    const editingInput = inputRefs.current[editingIndex];
    if (editingInput) {
      editingInput.focus();

      const len = editingInput.value?.length ?? 0;
      editingInput.setSelectionRange(0, len);
    }
  }, [editingIndex]);

  const mutateDeletion = useMutation({
    mutationFn: (query: DeleteDashboardQuery) => deleteDashboard(query),
  });
  const mutatePatch = useMutation({
    mutationFn: ({
      query,
      request,
    }: {
      query: PatchDashboardNameQuery;
      request: PatchDashboardNameRequestDto;
    }) => patchDashboardName(query, request),
  });
  const mutatePost = useMutation({
    mutationFn: (request: PostDashboardRequestDto) => postDashboard(request),
  });

  const handleChange = (currentIndex: number, newValue: string) => {
    setNewTabs((tabs) => [
      ...tabs.slice(0, currentIndex),
      newValue,
      ...tabs.slice(currentIndex + 1),
    ]);
  };

  const handleEdit = (currentIndex: number) => {
    setEditingIndex(currentIndex);
    inputRefs.current[currentIndex]?.focus();
  };

  const handleDelete = (currentIndex: number) => {
    setNewTabs((prev) =>
      prev.map((tab, index) => (index === currentIndex ? undefined : tab)),
    );
    setIsDeleted((prev) =>
      prev.map((isDeleted, index) =>
        index === currentIndex ? true : isDeleted,
      ),
    );
  };

  const handleAddClick = (currentIndex: number) => {
    setNewTabs((prev) => {
      const copy = [...prev];
      copy[currentIndex] = '';
      return copy;
    });
    setEditingIndex(currentIndex);
    inputRefs.current[currentIndex]?.focus();
  };

  const handleSave = async () => {
    const trimmedTabs = newTabs.map((tab) => tab?.trim()); // trim 처리

    // 중복 확인
    const filteredTabs = trimmedTabs.filter((tab) => tab) as string[]; // undefined 및 빈 문자열 제거
    const hasDuplicate = new Set(filteredTabs).size !== filteredTabs.length;
    if (hasDuplicate) {
      return;
    }

    // 삭제될 경우 현재 선택 대시보드가 삭제되면, 현재 대시보드 변경
    const currentDashboardIndex = tabs.findIndex(
      (t) => t.id === currentDashboardId,
    );
    if (isDeleted[currentDashboardIndex]) {
      setCurrentDashboardId(tabs[0].id);
    }

    try {
      // 삭제 요청
      await Promise.all(
        isDeleted.map((deleted, index) => {
          if (deleted) {
            return mutateDeletion.mutateAsync({ dashboardId: tabs[index].id });
          }
        }),
      );

      // 이름 변경 요청 (삭제한 적이 없고, 이전과 이름이 다른 경우)
      await Promise.all(
        trimmedTabs.map((tab, index) => {
          if (!tab) {
            return Promise.resolve();
          }

          if (
            !isDeleted[index] &&
            tabs[index]?.name &&
            tab !== tabs[index]?.name
          ) {
            return mutatePatch.mutateAsync({
              query: { dashboardId: tabs[index].id },
              request: { name: tab },
            });
          }
        }),
      );

      // 추가 요청 (삭제한 곳에 작성했거나 빈칸에 새로 작성한 경우)
      await Promise.all(
        trimmedTabs.map((tab, index) => {
          if (!tab) {
            return Promise.resolve();
          }

          if (isDeleted[index] || !tabs[index]?.name) {
            return mutatePost.mutateAsync({ name: tab });
          }
        }),
      );
    } catch (e) {
      const message = (e as Error).message || '알 수 없는 오류가 발생했습니다.';
      // TODO 에러 처리 개선 필요
      alert(message);
    }

    // 모든 mutation이 완료된 후 한 번만 invalidate
    await queryClient.invalidateQueries(dashboardOptions.list);

    closeDialog();
  };

  const handleCancel = () => {
    setNewTabs(tabs.map((tab) => tab.name));
    closeDialog();
  };

  return {
    inputRefs,
    newTabs,
    editingIndex,
    setEditingIndex,
    handleChange,
    handleEdit,
    handleDelete,
    handleAddClick,
    handleSave,
    handleCancel,
  } as const;
};

export default useDashboardTabsDialog;
