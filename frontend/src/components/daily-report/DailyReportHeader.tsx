import { useQuery } from '@tanstack/react-query';

import { SectionTitle } from '@/components/shared';
import { notificationOptions } from '@/services/daily-report';
import { getRelativeDatetimeWithOneHourAfter } from '@/utils/shared';

import { NotificationDialogTrigger } from './notification-dialog';

export const DailyReportHeader = () => {
  const { data: nextClosingTime } = useQuery({
    ...notificationOptions.closingTime,
    select: (data) => new Date(data.nextClosingTime),
  });

  return (
    <header className="flex justify-between">
      <SectionTitle
        title="하루 리포트"
        description={
          nextClosingTime
            ? `다음 하루 리포트는 ${getRelativeDatetimeWithOneHourAfter(nextClosingTime)}에 발행돼요.`
            : '하루 리포트는 마감시간 기준 한 시간 내에 발행돼요.'
        }
      />
      <NotificationDialogTrigger />
    </header>
  );
};
