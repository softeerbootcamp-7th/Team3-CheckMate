// 타이머 기반 숏폴링
// 첫 렌더링 시 existsUnread 조회 요청을 보냄
// 첫 렌더링 시 알림이 나올 시작시간, 마감시간 조회 요청을 보냄
// 브라우저에서 20분마다 현재 시간 체크
// 현재시간이 알림이 나올 시작시간과 마감시간 사이에 있다면
//    5분 단위로 existsUnread 조회 요청을 폴링함
//    existsUnread이 true라면
//      알림 목록 조회 요청을 보냄
//      다음 알림이 나올 시작시간과 마감시간 조회 요청을 보냄

import { useEffect, useRef } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { notificationOptions } from '@/services/daily-report';

const TIME_CHECK_INTERVAL = 20 * 1000; // 20분
const NOTIFICATION_POLLING_INTERVAL = 5 * 60 * 1000; // 5분

const ONE_HOUR_IN_MS = 60 * 60 * 1000;

export const useNotificationPolling = () => {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mountedRef = useRef(true);

  const queryClient = useQueryClient();

  const clearTimer = () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  };

  const startPolling = async () => {
    clearTimer();
    if (!mountedRef.current) {
      return;
    }

    try {
      // 미열람 알림 조회
      const existsUnread = await queryClient.fetchQuery(
        notificationOptions.existsUnread,
      );

      if (!mountedRef.current) {
        return;
      }

      if (existsUnread) {
        // 미열람 알림이 있다면 알림 목록을 불러오고, 타임 정보를 갱신
        await queryClient.fetchQuery(notificationOptions.list);
        await queryClient.invalidateQueries(notificationOptions.closingTime);
        checkCurrentTime();
        return;
      }
    } catch (err) {
      console.error('Notification polling error:', err);
      // 에러가 나도 폴링을 멈추지 않음
    }

    if (!mountedRef.current) {
      return;
    }
    timeoutId.current = setTimeout(startPolling, NOTIFICATION_POLLING_INTERVAL);
  };

  const checkCurrentTime = async () => {
    clearTimer();
    if (!mountedRef.current) {
      return;
    }
    const data = await queryClient.ensureQueryData(
      notificationOptions.closingTime,
    );

    const now = new Date();

    if (data) {
      const startTime = new Date(data.nextClosingTime);
      const endTime = new Date(startTime.getTime() + ONE_HOUR_IN_MS);

      if (startTime <= now && now <= endTime) {
        // 리포트 발행 예정 시간이라면 폴링 시작
        startPolling();
        return;
      }
    }

    // 타이머로 20분마다 현재시간 체크
    if (!mountedRef.current) {
      return;
    }
    timeoutId.current = setTimeout(checkCurrentTime, TIME_CHECK_INTERVAL);
  };

  useEffect(() => {
    mountedRef.current = true;
    checkCurrentTime();

    return () => {
      mountedRef.current = false;
      clearTimer();
    };
    // 마운트/언마운트 시 한 번만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return;
};
