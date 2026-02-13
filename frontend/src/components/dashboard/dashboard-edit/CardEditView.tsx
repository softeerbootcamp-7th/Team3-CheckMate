import { useNavigate } from 'react-router-dom';

import { ButtonGroup } from '@/components/shared';
import { useEditCard } from '@/hooks/dashboard';

import { CardEditViewTabs } from './CardEditViewTabs';

export const CardEditView = () => {
  const navigate = useNavigate();

  const { isDirty } = useEditCard();

  const handleCancel = () => {
    navigate(-1);
  };
  const handleSave = () => {
    // TODO 저장 로직 구현
    navigate(-1);
  };

  return (
    <section className="bg-special-card-bg flex h-full w-[800px] shrink-0 flex-col pt-20 pr-5 pl-12.5">
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
    </section>
  );
};
