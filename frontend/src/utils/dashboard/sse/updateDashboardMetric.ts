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

/**
 * 매출 추이 쿼리 데이터 업데이트 함수
 */
export const updateSalesTrendData =
  (response: SalesTrendItem) => (oldData?: GetSalesTrendResponseDto) => {
    if (!oldData) {
      return oldData;
    }

    return {
      items: [...oldData.items.slice(0, -1), response],
    };
  };

/**
 * 피크타임 쿼리 데이터 업데이트 함수
 */
export const updatePeakTimeData =
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
  };

/**
 * 요일별 매출 패턴 쿼리 데이터 업데이트 함수
 */
export const updateWeekdaySalesPatternData =
  (response: GetDashboardSalesByDayResponseDto) =>
  (oldData?: GetDetailSalesByDayResponseDto) => {
    if (!oldData) {
      return oldData;
    }

    const { topDay, isSignificant, day, avgNetAmount, orderCount } = response;
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
  };

/**
 * 시간대별 메뉴 주문건수 쿼리 데이터 업데이트 함수
 */
export const updateTimeBasedMenuOrderCountData =
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
  };

/**
 * 인기 메뉴 조합 쿼리 데이터 업데이트 함수
 */
export const updatePopularMenuCombinationData =
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
  };
