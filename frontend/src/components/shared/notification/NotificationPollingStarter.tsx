import { useNotificationPolling } from '@/hooks/daily-report/useNotificationPolling';

/**
 * 전역에서 알림 폴링 훅을 한 번만 마운트하기 위한 스타터 컴포넌트
 */
export const NotificationPollingStarter = () => {
  useNotificationPolling();
  return null;
};
