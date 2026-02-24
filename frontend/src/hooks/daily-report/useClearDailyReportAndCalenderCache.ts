import { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { dailyReportKeys } from '@/services/daily-report';
import { formatDateISO } from '@/utils/shared';

// 페이지 닫을 때 하루 리포트 관련 캐시 너무 많이 쌓여 있다면 오늘 데이터 제외하고 다 제거하는 훅

const DAILY_REPORT_CACHE_LIMIT = 20; // 하루 리포트 관련 캐시(데일리 리포트, 월별 매출 정보)가 10개 이상이면 초기화

export const useClearDailyReportAndCalenderCache = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      // 하루 리포트 관련 캐시 개수
      const dailyReportQueriesCount = queryClient
        .getQueryCache()
        .findAll({ queryKey: dailyReportKeys.all }).length;

      if (dailyReportQueriesCount <= DAILY_REPORT_CACHE_LIMIT) {
        return; // 캐시 개수가 10개 이하라면 초기화 안 함
      }
      // 오늘에 해당하는 데일리 리포트 캐시 데이터 미리 저장
      const today = new Date();
      const todayDailyReportChche = queryClient.getQueryData(
        dailyReportKeys.content(formatDateISO(today) ?? ''),
      );
      const thisMonthCalenderCache = queryClient.getQueryData(
        dailyReportKeys.calendar(today.getFullYear(), today.getMonth() + 1),
      );

      // 하루 리포트 관련 캐시 모두 제거
      queryClient.removeQueries({
        queryKey: dailyReportKeys.all,
      });

      // 오늘에 해당하는 데일리 리포트 캐시 데이터 다시 저장
      if (todayDailyReportChche) {
        queryClient.setQueryData(
          dailyReportKeys.content(formatDateISO(today) ?? ''),
          todayDailyReportChche,
        );
      }
      if (thisMonthCalenderCache) {
        queryClient.setQueryData(
          dailyReportKeys.calendar(today.getFullYear(), today.getMonth() + 1),
          thisMonthCalenderCache,
        );
      }
    };
  }, [queryClient]);
};
