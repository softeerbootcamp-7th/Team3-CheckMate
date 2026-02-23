import { useCallback, useEffect, useRef } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

import { useQueryClient } from '@tanstack/react-query';

import {
  DASHBOARD_SSE_EVENT,
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
import { dashboardKeys, dashboardOptions } from '@/services/dashboard';
import DashboardSseDedicatedWorker from '@/services/dashboard/sse/dashboardSseDedicatedWorker?worker';
import DashboardSseSharedWorker from '@/services/dashboard/sse/dashboardSseSharedWorker?sharedworker';
import type { DashboardSseWorkerMessage } from '@/types/dashboard';
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
import { usePostCardSubscription } from './usePostCardSubscription';

export const useDashboardSseConnection = () => {
  const { showBoundary } = useErrorBoundary();
  const { currentDashboardId } = useDashboardTabsContext();

  const queryClient = useQueryClient();

  const retryCountRef = useRef(0);
  const currentDashboardIdRef = useRef(currentDashboardId);

  const { subscribeDashboardCardList } = usePostCardSubscription();

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
        void queryClient
          .ensureQueryData(
            dashboardOptions.cardList(currentDashboardIdRef.current),
          )
          .then((response) => {
            const topics = response.map((card) => card.cardCode);
            subscribeDashboardCardList({
              topics,
            });
          })
          .catch((error) => {
            showBoundary(error);
          });
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
      subscribeDashboardCardList,
    ],
  );

  useEffect(() => {
    currentDashboardIdRef.current = currentDashboardId;
  }, [currentDashboardId]);

  const sseWorkerRef = useRef<SharedWorker | Worker | null>(null);

  useEffect(() => {
    const initializeSseWorker = () => {
      try {
        const worker = new DashboardSseSharedWorker();
        sseWorkerRef.current = worker;

        worker.port.onmessage = (
          event: MessageEvent<DashboardSseWorkerMessage>,
        ) => {
          handleSseMessage(event.data.data);
        };
        worker.port.start();
      } catch {
        // shared worker 미지원 브라우저의 경우, dedicated worker 사용 (fallback)
        const dedicatedWorker = new DashboardSseDedicatedWorker();
        sseWorkerRef.current = dedicatedWorker;
        dedicatedWorker.onmessage = (
          event: MessageEvent<DashboardSseWorkerMessage>,
        ) => {
          handleSseMessage(event.data.data);
        };

        dedicatedWorker.postMessage({
          type: DASHBOARD_SSE_EVENT.CONNECT,
        });
      }
    };
    initializeSseWorker();

    return () => {
      const sseWorker = sseWorkerRef.current;
      // DedicatedWorker 인 경우 -> terminate
      if (sseWorker instanceof Worker) {
        sseWorker.terminate();
      } else if (sseWorker) {
        sseWorker.port.close();
      }

      sseWorkerRef.current = null;
    };
  }, [handleSseMessage]);
};
