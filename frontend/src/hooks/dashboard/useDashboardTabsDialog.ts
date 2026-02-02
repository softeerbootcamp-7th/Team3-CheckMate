import { useEffect, useRef, useState } from 'react';

import { DASHBOARD_TABS_DIALOG_MODE } from '@/constants/dashboard';

import { useDashboardTabsContext } from '.';

export const useDashboardTabsDialog = () => {
  const { tabs, dialogMode, setTabs, closeDialog } = useDashboardTabsContext();

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

  const handleChange = (index: number, newValue: string) => {
    setNewTabs((tabs) => [
      ...tabs.slice(0, index),
      newValue,
      ...tabs.slice(index + 1),
    ]);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    inputRefs.current[index]?.focus();
  };

  const handleDelete = (index: number) => {
    setNewTabs((prev) => prev.map((r, i) => (i === index ? undefined : r)));
    setIsDeleted((prev) => prev.map((r, i) => (i === index ? true : r)));
  };

  const handleAddClick = (index: number) => {
    setNewTabs((prev) => {
      const copy = [...prev];
      copy[index] = '';
      return copy;
    });
    setEditingIndex(index);
    inputRefs.current[index]?.focus();
  };

  const handleSave = () => {
    // 중복 검사
    const hasDuplicate = newTabs.some(
      (tab, i) =>
        tab &&
        tab.trim() &&
        newTabs.indexOf(tab) !== i &&
        newTabs.indexOf(tab) !== -1,
    );
    if (hasDuplicate) {
      return;
    }

    isDeleted.forEach((deleted) => {
      if (deleted) {
        // TODO 서버에 삭제 요청 보내기
      }
    });

    // trim 후 저장
    const filteredTabs = newTabs.filter(
      (tab) => tab !== undefined && tab.trim() !== '',
    ) as string[];
    const trimmedTabs = filteredTabs.map((tab) => tab.trim());

    // TODO 서버에 추가 요청 보내기
    setTabs(trimmedTabs);

    closeDialog();
  };

  const handleCancel = () => {
    setNewTabs(tabs.slice(0, 5));
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
