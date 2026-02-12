import { Link } from 'react-router-dom';

import { Button } from '@/components/shared/shadcn-ui';
import { ROUTE_PATHS } from '@/constants/shared';

export const DashboardNavigateButton = () => {
  return (
    <Button
      className="rounded-150 bg-brand-main text-grey-50 title-small-semibold! flex h-14 w-55 items-center justify-center"
      asChild
    >
      <Link to={ROUTE_PATHS.DASHBOARD} replace>
        대시보드 바로가기
      </Link>
    </Button>
  );
};
