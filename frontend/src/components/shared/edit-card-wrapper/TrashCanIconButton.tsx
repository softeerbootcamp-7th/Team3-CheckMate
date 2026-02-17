import { Trash2 } from 'lucide-react';

// 대시보드 편집 용 패널의 우측 위 쓰래기통 버튼
interface TrashCanIconButtonProps {
  onClickDeleteButton?: () => void;
}

export const TrashCanIconButton = ({
  onClickDeleteButton,
}: TrashCanIconButtonProps) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClickDeleteButton?.();
      }}
      className="rounded-unlimit hover:text-others-negative border-grey-200 bg-grey-100 text-grey-900 active:bg-grey-900 active:text-grey-50 flex size-6.5 items-center justify-center border"
    >
      <Trash2 className="size-4" />
    </button>
  );
};
