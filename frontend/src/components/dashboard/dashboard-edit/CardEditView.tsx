import { useNavigate } from 'react-router-dom';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ButtonGroup } from '@/components/shared';
import {
  useDragAndDropCard,
  useEditCard,
  useEditCardContext,
} from '@/hooks/dashboard';
import { dashboardOptions, putDashboardCardList } from '@/services/dashboard';
import type {
  PutDashboardCardListParam,
  PutDashboardCardListRequestDto,
} from '@/types/dashboard';

import { CardEditViewTabs } from './CardEditViewTabs';

export const CardEditView = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isDirty } = useEditCard();

  const { isOverList, placedCards, dashboardId } = useEditCardContext();

  const { handleListDragEnter, handleListDragLeave, handleListDrop } =
    useDragAndDropCard();

  const mutateCardList = useMutation({
    mutationFn: ({
      param,
      body,
    }: {
      param: PutDashboardCardListParam;
      body: PutDashboardCardListRequestDto;
    }) => putDashboardCardList(param, body),
  });

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    mutateCardList.mutate(
      { param: { dashboardId }, body: placedCards },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(dashboardOptions.cardList(dashboardId));
          navigate(-1);
        },
      },
    );
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
        <>
          <div className="bg-grey-500 text-grey-0 absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center opacity-50"></div>
          <p className="headline-medium-bold text-grey-0 absolute top-1/2 right-0 bottom-0 left-0 text-center">
            삭제하려면 여기에 놓으세요
          </p>
        </>
      )}
    </section>
  );
};
