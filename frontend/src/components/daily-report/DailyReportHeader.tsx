import { BellIcon } from '@/assets/icons';
import { SectionTitle } from '@/components/shared';
import { Button } from '@/components/shared/shadcn-ui';

import { Badge } from '../shared/badge/Badge';

export const DailyReportHeader = () => {
  const relativeDate = '{상대일자}';
  const timeRange = '{시간범위}';

  return (
    <header className="flex justify-between">
      <SectionTitle
        title="하루 리포트"
        description={`다음 하루 리포트는 ${relativeDate} ${timeRange}에 발행돼요.`}
      />
      <Button className="bg-grey-0 rounded-unlimit size-15">
        <Badge show={true}>
          <BellIcon className="size-6" />
        </Badge>
      </Button>
    </header>
  );
};
