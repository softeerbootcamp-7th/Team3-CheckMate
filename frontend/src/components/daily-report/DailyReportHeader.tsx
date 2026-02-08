import { SectionTitle } from '@/components/shared';

import { NotificationDialogTrigger } from './notification-dialog';

export const DailyReportHeader = () => {
  const relativeDate = '{상대일자}';
  const timeRange = '{시간범위}';

  return (
    <header className="flex justify-between">
      <SectionTitle
        title="하루 리포트"
        description={`다음 하루 리포트는 ${relativeDate} ${timeRange}에 발행돼요.`}
      />
      <NotificationDialogTrigger />
    </header>
  );
};
