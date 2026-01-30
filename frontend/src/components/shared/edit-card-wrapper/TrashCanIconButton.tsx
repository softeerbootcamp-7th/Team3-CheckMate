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
      onClick={onClickDeleteButton}
      className="rounded-unlimit hover:text-others-negative flex size-6.5 items-center justify-center border border-gray-200 bg-gray-100 text-gray-900 active:bg-gray-900 active:text-gray-50"
    >
      <Trash2 className="size-4" />
    </button>
  );
};
