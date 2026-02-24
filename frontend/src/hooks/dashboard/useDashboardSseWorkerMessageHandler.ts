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
import type { EventSourceMessage } from '@/types/shared';
import {
  updatePeakTimeData,
  updatePopularMenuCombinationData,
  updateSalesTrendData,
  updateTimeBasedMenuOrderCountData,
  updateWeekdaySalesPatternData,
} from '@/utils/dashboard';

import { useDashboardSseWorkerContext } from './sse';
import { useDashboardTabsContext } from './useDashboardTabsContext';

export const useDashboardSseWorkerMessageHandler = () => {
  const { showBoundary } = useErrorBoundary();
  const { currentDashboardId } = useDashboardTabsContext();

  const queryClient = useQueryClient();

  const currentDashboardIdRef = useRef(currentDashboardId);
  const isSseConnectedRef = useRef(false);

  const { subscribeMessage, postMessage } = useDashboardSseWorkerContext();

  const getCardDetailQueryKey = useCallback((cardCode: MetricCardCode) => {
    return dashboardKeys.cardDetail(currentDashboardIdRef.current, {
      analysisCardCode: cardCode,
      customPeriod: false,
    });
  }, []);

  const getCardList = useCallback(async () => {
    return queryClient.ensureQueryData(
      dashboardOptions.cardList(currentDashboardIdRef.current),
    );
  }, [queryClient]);

  const subscribeCardList = useCallback(async () => {
    try {
      const cardList = await getCardList();
      const topics = cardList.map((card) => card.cardCode);

      if (topics.length > 0) {
        postMessage({
          type: DASHBOARD_SSE_EVENT.SUBSCRIBE,
          data: {
            topics,
          },
        });
      }
    } catch (error) {
      showBoundary(error);
    }
  }, [getCardList, showBoundary, postMessage]);

  const handleSseMessage = useCallback(
    (message: EventSourceMessage) => {
      if (message.event === 'connect') {
        isSseConnectedRef.current = true;
        subscribeCardList();
        return;
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
    [queryClient, getCardDetailQueryKey, showBoundary, subscribeCardList],
  );

  useEffect(() => {
    // 언마운트 시 SSE 연결 상태 플래그 초기화
    return () => {
      isSseConnectedRef.current = false;
    };
  }, []);

  useEffect(() => {
    currentDashboardIdRef.current = currentDashboardId;
    // SSE 연결 이후 탭이 변경되면 카드 구독 재시도
    if (isSseConnectedRef.current) {
      subscribeCardList();
    }
  }, [currentDashboardId, subscribeCardList]);

  useEffect(() => {
    return subscribeMessage((message) => {
      const { data } = message;
      const { type, data: messageData } = data;
      switch (type) {
        case DASHBOARD_SSE_EVENT.MESSAGE:
          handleSseMessage(messageData);
          break;
        case DASHBOARD_SSE_EVENT.CONNECT:
          isSseConnectedRef.current = true;
          subscribeCardList();
          break;
      }
    });
  }, [subscribeMessage, handleSseMessage, subscribeCardList]);
};
