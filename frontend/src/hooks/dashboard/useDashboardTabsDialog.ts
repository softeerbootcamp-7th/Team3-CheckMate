import { useEffect, useMemo, useRef, useState } from 'react';

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import { DASHBOARD_TABS_DIALOG_MODE } from '@/constants/dashboard';
import {
  dashboardOptions,
  deleteDashboard,
  patchDashboardName,
  postDashboard,
} from '@/services/dashboard';
import type {
  DeleteDashboardParam,
  PatchDashboardNameParam,
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
    mutationFn: (param: DeleteDashboardParam) => deleteDashboard(param),
  });
  const mutatePatch = useMutation({
    mutationFn: ({
      param,
      body,
    }: {
      param: PatchDashboardNameParam;
      body: PatchDashboardNameRequestDto;
    }) => patchDashboardName(param, body),
  });
  const mutatePost = useMutation({
    mutationFn: (body: PostDashboardRequestDto) => postDashboard(body),
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

    if (!validateTabs()) {
      toast('입력하신 내용을 저장할 수 없어요.');
      return;
    }

    // 삭제될 경우 현재 선택 대시보드가 삭제되면, 현재 대시보드 변경
    const currentDashboardIndex = tabs.findIndex(
      (tab) => tab.id === currentDashboardId,
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
          return Promise.resolve();
        }),
      );

      // 이름 변경 요청 (삭제한 적이 없고, 이전과 이름이 다른 경우)
      await Promise.all(
        trimmedTabs.map((tab, index) => {
          if (tab) {
            if (
              !isDeleted[index] &&
              tabs[index]?.name &&
              tab !== tabs[index]?.name
            ) {
              return mutatePatch.mutateAsync({
                param: { dashboardId: tabs[index].id },
                body: { name: tab },
              });
            }
          }
          return Promise.resolve();
        }),
      );

      // 추가 요청 (삭제한 곳에 작성했거나 빈칸에 새로 작성한 경우)
      await Promise.all(
        trimmedTabs.map((tab, index) => {
          if (tab) {
            if (isDeleted[index] || !tabs[index]?.name) {
              return mutatePost.mutateAsync({ name: tab });
            }
          }
          return Promise.resolve();
        }),
      );
    } catch (e) {
      const message = (e as Error).message || '알 수 없는 오류가 발생했습니다.';
      // TODO 에러 처리 개선 필요
      toast(message);
    }

    // 모든 mutation이 완료된 후 한 번만 invalidate
    await queryClient.invalidateQueries(dashboardOptions.list);

    closeDialog();
  };

  const handleCancel = () => {
    setNewTabs(tabs.map((tab) => tab.name));
    closeDialog();
  };

  /** 원본과 비교하여 변경이 있는지 여부 */
  const isDirty = useMemo(() => {
    const trimmedTabs = newTabs.map((tab) => tab?.trim());
    const filteredTabs = trimmedTabs.filter((tab) => tab) as string[];
    const originalTabs = tabs.map((tab) => tab.name);

    // 개수가 다르면 변경임
    if (filteredTabs.length !== originalTabs.length) {
      return true;
    }

    // 각 탭 이름 비교
    return filteredTabs.some((tab, index) => tab !== originalTabs[index]);
  }, [newTabs, tabs]);

  const validateTabs = () => {
    const trimmedTabsMap = new Map<string, number>();

    for (let i = 0; i < newTabs.length; i++) {
      const tab = newTabs[i];
      if (tab === undefined) {
        continue;
      }

      const trimmed = tab.trim();
      if (!trimmed) {
        continue;
      }

      if (trimmed.length > 6 || trimmedTabsMap.has(trimmed)) {
        return false;
      }

      trimmedTabsMap.set(trimmed, i);
    }

    return true;
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
    isDirty,
    validateTabs,
  } as const;
};

export default useDashboardTabsDialog;
