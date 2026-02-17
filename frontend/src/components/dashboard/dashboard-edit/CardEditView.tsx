import { useNavigate } from 'react-router-dom';

import { ButtonGroup } from '@/components/shared';
import { useDragAndDropCard, useEditCard } from '@/hooks/dashboard';
import { useEditCardContext } from '@/hooks/dashboard/useEditCardContext';

import { CardEditViewTabs } from './CardEditViewTabs';

export const CardEditView = () => {
  const navigate = useNavigate();

  const { isDirty } = useEditCard();

  const { isOverList } = useEditCardContext();

  const { handleListDragEnter, handleListDragLeave, handleListDrop } =
    useDragAndDropCard();

  const handleCancel = () => {
    navigate(-1);
  };
  const handleSave = () => {
    // TODO 저장 로직 구현
    navigate(-1);
  };

  return (
    <section
      className="bg-special-card-bg relative flex h-full w-[800px] shrink-0 flex-col pt-20 pr-5 pl-12.5 select-none"
      onDragEnter={handleListDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleListDragLeave}
      onDrop={handleListDrop}
    >
      <header className="flex items-center justify-between pr-5">
        <h1 className="title-large-bold text-grey-900">카드 편집</h1>
        <ButtonGroup>
          <ButtonGroup.Negative message="나가기" onClick={handleCancel} />
          <ButtonGroup.Positive
            message="편집 완료"
            onClick={handleSave}
            disabled={!isDirty}
          />
        </ButtonGroup>
      </header>
      <CardEditViewTabs />
      {isOverList && (
        <div className="bg-others-negative text-grey-0 absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center opacity-50">
          DROP TO DELETE
        </div>
      )}
    </section>
  );
};
