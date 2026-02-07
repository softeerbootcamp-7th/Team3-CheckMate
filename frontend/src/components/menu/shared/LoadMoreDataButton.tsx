import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/shared/shadcn-ui';

interface LoadMoreDataButtonProps {
  path: string;
}

export const LoadMoreDataButton = ({ path }: LoadMoreDataButtonProps) => {
  const navigate = useNavigate();
  const handleClickLoadMore = () => {
    navigate(path);
  };
  return (
    <Button
      className="rounded-200 bg-grey-100 text-grey-600 body-medium-semibold! flex h-10 w-full items-center justify-center py-2.5"
      onClick={handleClickLoadMore}
    >
      더보기
    </Button>
  );
};
