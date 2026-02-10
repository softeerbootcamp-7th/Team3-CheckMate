import { SectionTitle } from '@/components/shared';

import { NotificationDialogTrigger } from './notification-dialog';

export const DailyReportHeader = () => {
  return (
    <header className="flex justify-between">
      <SectionTitle
        title="하루 리포트"
        description={`하루 리포트는 마감시간 기준 한 시간 내에 발행돼요.`}
      />
      <NotificationDialogTrigger />
    </header>
  );
};
