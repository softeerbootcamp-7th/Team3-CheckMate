import { Link } from 'react-router-dom';

import { Button } from '@/components/shared/shadcn-ui';

interface LoadMoreDataButtonProps {
  path: string;
}

export const LoadMoreDataButton = ({ path }: LoadMoreDataButtonProps) => {
  return (
    <Button
      className="rounded-200 bg-grey-100 text-grey-600 body-medium-semibold! flex h-10 w-full items-center justify-center py-2.5"
      asChild
    >
      <Link to={path}>더보기</Link>
    </Button>
  );
};
