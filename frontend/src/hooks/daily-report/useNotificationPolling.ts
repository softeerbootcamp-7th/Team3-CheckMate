import { useCallback, useEffect, useRef, useState } from 'react';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { notificationOptions } from '@/services/daily-report';

const TIME_CHECK_INTERVAL = 20 * 60 * 1000; // 20분
const NOTIFICATION_POLLING_INTERVAL = 5 * 60 * 1000; // 5분

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export const useNotificationPolling = () => {
  const queryClient = useQueryClient();

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  const [isWithinReportTime, setIsWithinReportTime] = useState(false);

  const clearTimer = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };
  const repeatCheckTime = useCallback(async () => {
    clearTimer();
    if (!mountedRef.current) {
      return;
    }

    try {
      // 현재 시간이 리포트 발행 시간 범위 내에 있는지 interval마다 체크
      const now = new Date();
      const closingTimeData = await queryClient.fetchQuery(
        notificationOptions.closingTime,
      );

      if (!mountedRef.current) {
        return;
      }
      if (closingTimeData) {
        const startTime = new Date(closingTimeData.nextClosingTime);
        const endTime = new Date(startTime.getTime() + ONE_HOUR_IN_MS);

        setIsWithinReportTime(startTime <= now && now <= endTime);
      }
    } catch (e) {
      console.error('failed to fetch closing time', e);
      setIsWithinReportTime(false);
    } finally {
      // 요청 실패 여부와 상관없이 타이머는 계속 설정
      if (mountedRef.current) {
        timeoutId.current = setTimeout(repeatCheckTime, TIME_CHECK_INTERVAL);
      }
    }
  }, [queryClient]);

  useEffect(() => {
    mountedRef.current = true;
    // 마운트 시 타이머 시작
    repeatCheckTime();

    return () => {
      mountedRef.current = false;
      clearTimer();
    };
    // 마운트/언마운트 시 한 번만 실행
  }, [repeatCheckTime]);

  const { data: existsUnread } = useQuery({
    ...notificationOptions.existsUnread,
    // existsUnread는 리포트 발행시간일 때만 활성화되어 주기 폴링
    enabled: isWithinReportTime,
    refetchInterval: isWithinReportTime ? NOTIFICATION_POLLING_INTERVAL : false,
  });

  const onSuccessExistsUnread = useCallback(async () => {
    if (!mountedRef.current) {
      return;
    }
    // 미열람 알림이 있다면 알림 목록을 미리 가져오고 closingTime을 갱신
    try {
      await queryClient.fetchQuery(notificationOptions.list);
      await queryClient.invalidateQueries(notificationOptions.closingTime);

      setIsWithinReportTime(false); // closingTime을 새로 갱신했으니 리포트 발행 시간 체크를 다시 시작하도록 상태 초기화
    } catch (err) {
      console.error('failed to fetch notifications or invalidate time', err);
    }
  }, [queryClient]);

  useEffect(() => {
    if (existsUnread) {
      // 미열람 알림이 있음
      onSuccessExistsUnread();
    }
  }, [existsUnread, onSuccessExistsUnread, queryClient]);

  return;
};
