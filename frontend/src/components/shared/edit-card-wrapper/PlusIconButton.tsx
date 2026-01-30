import { Plus } from 'lucide-react';

// 대시보드 편집 용 패널의 우측 위 + 버튼
interface PlusIconButtonProps {
  onClickAddButton?: () => void;
}

export const PlusIconButton = ({ onClickAddButton }: PlusIconButtonProps) => {
  return (
    <button
      onClick={onClickAddButton}
      className="rounded-unlimit flex size-6.5 items-center justify-center border border-gray-200 bg-gray-100 text-gray-900 hover:border-gray-900 active:bg-gray-900 active:text-gray-50"
    >
      <Plus className="size-4" />
    </button>
  );
};
