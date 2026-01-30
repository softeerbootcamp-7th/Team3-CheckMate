import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/shared/shadcn-ui';

export const DashboardNavigateButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/dashboard', {
      replace: true,
    });
  };
  return (
    <Button
      className="rounded-150 bg-brand-main text-grey-50 title-small-semibold! flex h-14 w-55 items-center justify-center"
      type="button"
      onClick={handleClick}
    >
      대시보드 바로가기
    </Button>
  );
};
