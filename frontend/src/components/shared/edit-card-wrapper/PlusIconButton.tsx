import { Plus } from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';

// 대시보드 편집 용 패널의 우측 위 + 버튼
interface PlusIconButtonProps {
  onClickAddButton?: () => void;
}

export const PlusIconButton = ({ onClickAddButton }: PlusIconButtonProps) => {
  return (
    <Button
      onClick={onClickAddButton}
      className="rounded-unlimit border-grey-200 bg-grey-100 text-grey-900 hover:border-grey-900 active:bg-grey-900 active:text-grey-50 flex size-6.5 items-center justify-center border"
    >
      <Plus className="size-4" />
    </Button>
  );
};
