import { DialogFooter } from '@/components/shared/shadcn-ui';
import { MAX_DASHBOARD_TABS } from '@/constants/dashboard';
import { useDashboardTabsDialog } from '@/hooks/dashboard';

import { DashboardTabInput } from './DashboardTabInput';
import { DialogCancelButton } from './DialogCancelButton';
import { DialogSaveButton } from './DialogSaveButton';
import { TabAddButton } from './TabAddButton';
import { TabDeleteButton } from './TabDeleteButton';
import { TabEditButton } from './TabEditButton';

export const DashboardTabsDialogContent = () => {
  const {
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
  } = useDashboardTabsDialog();

  return (
    <>
      <div className="mt-400 mb-700 flex flex-col gap-2">
        {Array(MAX_DASHBOARD_TABS)
          .fill(null)
          .map((_, index) =>
            newTabs[index] !== undefined || index === editingIndex ? (
              <div
                key={`dashboard-tabs-input-${index}`}
                className="outline-grey-300 rounded-250 flex items-center justify-between px-300 py-250 outline-1"
              >
                <DashboardTabInput
                  index={index}
                  newTabs={newTabs}
                  handleChange={handleChange}
                  editingIndex={editingIndex}
                  setEditingIndex={setEditingIndex}
                  ref={(inputEl: HTMLInputElement | null) => {
                    inputRefs.current[index] = inputEl;
                  }}
                />
                {index !== 0 && (
                  <div className="flex gap-200">
                    <TabEditButton
                      onClick={() => handleEdit(index)}
                      disabled={index === editingIndex}
                    />
                    <TabDeleteButton
                      onClick={() => handleDelete(index)}
                      disabled={index === editingIndex}
                    />
                  </div>
                )}
              </div>
            ) : (
              <TabAddButton
                key={`dashboard-tabs-input-${index}`}
                onClick={() => handleAddClick(index)}
              />
            ),
          )}
      </div>
      <DialogFooter className="flex justify-end gap-2.5">
        <DialogCancelButton onClick={handleCancel} />
        <DialogSaveButton onClick={handleSave} />
      </DialogFooter>
    </>
  );
};
