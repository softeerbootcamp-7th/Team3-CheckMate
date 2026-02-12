import { useEffect, useRef, useState } from 'react';

import { DASHBOARD_TABS_DIALOG_MODE } from '@/constants/dashboard';

import { useDashboardTabsContext } from '.';

export const useDashboardTabsDialog = () => {
  const {
    tabs,
    dialogMode,
    setTabs,
    closeDialog,
    currentTabIndex,
    setCurrentTabIndex,
  } = useDashboardTabsContext();

  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [newTabs, setNewTabs] = useState<(string | undefined)[]>(tabs);
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

  const handleSave = () => {
    const trimmedTabs = newTabs.map((tab) => tab?.trim()); // trim 처리
    const filteredTabs = trimmedTabs.filter((tab) => tab) as string[]; // undefined 및 빈 문자열 제거

    // 중복 확인
    const hasDuplicate = new Set(filteredTabs).size !== filteredTabs.length;
    if (hasDuplicate) {
      return;
    }

    isDeleted.forEach((deleted, index) => {
      if (deleted) {
        // TODO 서버에 삭제 요청 보내기
        if (currentTabIndex === index) {
          setCurrentTabIndex(0);
        }
      }
    });

    // TODO 서버에 추가 요청 보내기
    setTabs(filteredTabs);

    closeDialog();
  };

  const handleCancel = () => {
    setNewTabs(tabs);
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
