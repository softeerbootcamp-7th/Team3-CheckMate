import { useCallback, useEffect, useRef } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import { useQueryClient } from '@tanstack/react-query';

import {
  isAveragePriceMetricCardCode,
  isDailySalesTrendMetricCardCode,
  isIngredientConsumptionRankMetricCardCode,
  isMenuSalesRankingMetricCardCode,
  isMetricCardCode,
  isMonthlySalesTrendMetricCardCode,
  isOrderChannelMetricCardCode,
  isOrderCountMetricCardCode,
  isPayMethodMetricCardCode,
  isPeakTimeMetricCardCode,
  isPopularMenuCombinationMetricCardCode,
  isRealSalesMetricCardCode,
  isSalesTypeMetricCardCode,
  isTimeBasedMenuOrderCountMetricCardCode,
  isWeekdaySalesPatternMetricCardCode,
  isWeeklySalesTrendMetricCardCode,
  type MetricCardCode,
} from '@/constants/dashboard';
import { dashboardKeys } from '@/services/dashboard/keys';
import { sseClient } from '@/services/shared';
import type {
  GetDashboardPopularMenuCombinationResponseDto,
  GetDashboardTimeSlotMenuOrderCountResponseDto,
  GetDetailTimeSlotMenuOrderCountResponseDto,
  GetPopularMenuCombinationResponseDto,
} from '@/types/menu';
import type {
  GetDashboardPeakTimeResponseDto,
  GetDashboardSalesByDayResponseDto,
  GetDetailPeakTimeResponseDto,
  GetDetailSalesByDayResponseDto,
  GetSalesTrendResponseDto,
  SalesTrendItem,
} from '@/types/sales';
import type { EventSourceMessage } from '@/types/shared';

import { useDashboardTabsContext } from './useDashboardTabsContext';

export const useDashboardSseConnection = () => {
  const { showBoundary } = useErrorBoundary();
  const { currentDashboardId } = useDashboardTabsContext();

  const queryClient = useQueryClient();

  const retryCountRef = useRef(0);
  const currentDashboardIdRef = useRef(currentDashboardId);

  const getCardDetailQueryKey = useCallback((cardCode: MetricCardCode) => {
    return dashboardKeys.cardDetail(currentDashboardIdRef.current, {
      analysisCardCode: cardCode,
      customPeriod: false,
    });
  }, []);

  /**
   * 매출 추이 쿼리 데이터 업데이트 함수
   */
  const updateSalesTrendData = useCallback(
    (response: SalesTrendItem) => (oldData?: GetSalesTrendResponseDto) => {
      if (!oldData) {
        return oldData;
      }

      return {
        items: [...oldData.items.slice(0, -1), response],
      };
    },
    [],
  );

  /**
   * 피크타임 쿼리 데이터 업데이트 함수
   */
  const updatePeakTimeData = useCallback(
    (response: GetDashboardPeakTimeResponseDto) =>
      (oldData?: GetDetailPeakTimeResponseDto) => {
        if (!oldData) {
          return oldData;
        }

        const {
          timeSlot2H,
          orderCount,
          netAmount,
          todayPeak,
          comparisonPeak,
          diff,
          shiftDirection,
          beforeComparisonPeak,
        } = response;

        return {
          todayPeak,
          comparisonPeak,
          diff,
          shiftDirection,
          beforeComparisonPeak,
          todayItems: [
            ...oldData.todayItems.map((item) => {
              if (item.timeSlot2H === timeSlot2H) {
                return {
                  ...item,
                  orderCount,
                  netAmount,
                };
              }
              return item;
            }),
          ],
          week4Items: [...oldData.week4Items],
        };
      },
    [],
  );

  /**
   * 요일별 매출 패턴 쿼리 데이터 업데이트 함수
   */
  const updateWeekdaySalesPatternData = useCallback(
    (response: GetDashboardSalesByDayResponseDto) =>
      (oldData?: GetDetailSalesByDayResponseDto) => {
        if (!oldData) {
          return oldData;
        }

        const { topDay, isSignificant, day, avgNetAmount, orderCount } =
          response;
        return {
          topDay,
          isSignificant,
          items: oldData.items.map((item) => {
            if (item.day === day) {
              return {
                ...item,
                avgNetAmount,
                orderCount,
              };
            }
            return item;
          }),
        };
      },
    [],
  );

  /**
   * 시간대별 메뉴 주문건수 쿼리 데이터 업데이트 함수
   */
  const updateTimeBasedMenuOrderCountData = useCallback(
    (response: GetDashboardTimeSlotMenuOrderCountResponseDto) =>
      (oldData?: GetDetailTimeSlotMenuOrderCountResponseDto) => {
        const { timeSlot2H, menuName } = response;

        if (!oldData) {
          return oldData;
        }

        // 깊은 복사 후 해당 객체 수정
        const newItems = structuredClone(oldData.items);

        const firstItem = newItems[0];
        if (!firstItem) {
          return {
            items: newItems,
          };
        }

        firstItem.timeSlot2H = timeSlot2H;

        const firstMenu = firstItem.menus?.[0];
        if (firstMenu) {
          firstMenu.menuName = menuName;
        }

        return {
          items: newItems,
        };
      },
    [],
  );

  /**
   * 인기 메뉴 조합 쿼리 데이터 업데이트 함수
   */
  const updatePopularMenuCombinationData = useCallback(
    (response: GetDashboardPopularMenuCombinationResponseDto) =>
      (oldData?: GetPopularMenuCombinationResponseDto) => {
        const { firstMenuName, secondMenuName } = response;

        if (!oldData) {
          return oldData;
        }

        // 깊은 복사 후 해당 객체 수정
        const newItems = structuredClone(oldData.items);

        const firstItem = newItems[0];
        if (!firstItem) {
          return {
            items: newItems,
          };
        }

        firstItem.baseMenuName = firstMenuName;

        if (firstItem.pairedMenus) {
          const newPairedMenus = [...firstItem.pairedMenus];
          const firstPairedMenu = newPairedMenus[0];

          if (firstPairedMenu) {
            firstPairedMenu.menuName = secondMenuName;
          }

          firstItem.pairedMenus = newPairedMenus;
        }

        return {
          items: newItems,
        };
      },
    [],
  );

  const handleSseMessage = useCallback(
    (message: EventSourceMessage) => {
      if (message.event === 'connect') {
        retryCountRef.current = 0;
      }

      if (isMetricCardCode(message.event)) {
        try {
          const response = JSON.parse(message.data);
          // 매출 추이, 매출 패턴 제외 최신 데이터로 덮어쓰기
          if (
            isRealSalesMetricCardCode(message.event) ||
            isOrderCountMetricCardCode(message.event) ||
            isAveragePriceMetricCardCode(message.event) ||
            isMenuSalesRankingMetricCardCode(message.event) ||
            isIngredientConsumptionRankMetricCardCode(message.event) ||
            isSalesTypeMetricCardCode(message.event) ||
            isOrderChannelMetricCardCode(message.event) ||
            isPayMethodMetricCardCode(message.event)
          ) {
            queryClient.setQueryData(
              getCardDetailQueryKey(message.event),
              response,
            );
          }

          // 매출 추이 제일 최근 데이터만 업데이트
          if (
            isDailySalesTrendMetricCardCode(message.event) ||
            isWeeklySalesTrendMetricCardCode(message.event) ||
            isMonthlySalesTrendMetricCardCode(message.event)
          ) {
            queryClient.setQueryData(
              getCardDetailQueryKey(message.event),
              updateSalesTrendData(response),
            );
          }

          // 피크타임 현재 시간 데이터만 업데이트
          if (isPeakTimeMetricCardCode(message.event)) {
            queryClient.setQueryData(
              getCardDetailQueryKey(message.event),
              updatePeakTimeData(response),
            );
          }

          // 요일별 매출 패턴 제일 최근 데이터만 업데이트 및 최다 매출 요일 갱신
          if (isWeekdaySalesPatternMetricCardCode(message.event)) {
            queryClient.setQueryData(
              getCardDetailQueryKey(message.event),
              updateWeekdaySalesPatternData(response),
            );
          }

          if (isTimeBasedMenuOrderCountMetricCardCode(message.event)) {
            queryClient.setQueryData(
              getCardDetailQueryKey(message.event),
              updateTimeBasedMenuOrderCountData(response),
            );
          }

          if (isPopularMenuCombinationMetricCardCode(message.event)) {
            queryClient.setQueryData(
              getCardDetailQueryKey(message.event),
              updatePopularMenuCombinationData(response),
            );
          }
        } catch (error) {
          showBoundary(error);
        }
      }
    },
    [
      queryClient,
      getCardDetailQueryKey,
      updatePeakTimeData,
      updateTimeBasedMenuOrderCountData,
      updateWeekdaySalesPatternData,
      updateSalesTrendData,
      updatePopularMenuCombinationData,
      showBoundary,
    ],
  );

  const handleRetryInterval = useCallback(() => {
    retryCountRef.current++;
    // 지수 백오프
    const backoff = Math.min(
      1000 * Math.pow(2, retryCountRef.current - 1),
      30000,
    );
    return backoff;
  }, []);

  useEffect(() => {
    currentDashboardIdRef.current = currentDashboardId;
  }, [currentDashboardId]);

  useEffect(() => {
    const abortController = new AbortController();

    sseClient('/api/sse/connection', {
      signal: abortController.signal,
      onmessage: handleSseMessage,
      retryIntervalFn: handleRetryInterval,
    });

    return () => {
      abortController.abort();
    };
  }, [handleSseMessage, handleRetryInterval]);
};
