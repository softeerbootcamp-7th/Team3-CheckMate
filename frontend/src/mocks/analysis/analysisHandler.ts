import { HttpResponse, passthrough } from 'msw';

import {
  isOrderChannelMetricCardCode,
  isPaymentMethodMetricCardCode,
  isSalesTypeMetricCardCode,
  isWeekdaySalesPatternMetricCardCode,
} from '@/constants/dashboard';
import { isMenuMetricCardCodes } from '@/constants/menu';
import {
  ORDER_CHANNEL,
  PAYMENT_METHOD,
  SALES_BY_DAY,
  SALES_TYPE,
} from '@/constants/sales';
import type { SuccessResponse } from '@/services/shared';
import type {
  GetIngredientUsageRankingResponseDto,
  GetMenuSalesRankingResponseDto,
  GetPopularMenuCombinationResponseDto,
} from '@/types/menu';
import type {
  GetDetailSalesByDayResponseDto,
  GetIncomeStructureByOrderChannelResponseDto,
  GetIncomeStructureByPaymentMethodResponseDto,
  GetIncomeStructureBySalesTypeResponseDto,
} from '@/types/sales';

import {
  ingredientConsumptionRankItems,
  menuCombinationRankItems,
  menuSalesRankItems,
} from '../data';
import { mswHttp } from '../shared';

const getItemsWithRandomLength = <T>(items: T[]) => {
  const randomLength = Math.floor(Math.random() * (items.length + 1));

  return items.slice(0, randomLength);
};

const getPopularMenuCombinationItemsWithRandomLength = (
  items: GetPopularMenuCombinationResponseDto['items'],
) => {
  return getItemsWithRandomLength(items).map((item) => ({
    ...item,
    pairedMenus: item.pairedMenus
      ? getItemsWithRandomLength(item.pairedMenus)
      : item.pairedMenus,
  }));
};

const getHandler = [
  mswHttp.get('/api/analysis/detail', ({ request }) => {
    const url = new URL(request.url);
    const cardCode = url.searchParams.get('analysisCardCode');

    if (!cardCode) {
      return passthrough();
    }

    if (isSalesTypeMetricCardCode(cardCode)) {
      return HttpResponse.json<
        SuccessResponse<GetIncomeStructureBySalesTypeResponseDto>
      >({
        success: true,
        message: 'Success',
        data: {
          insight: {
            topType: 'DINE_IN',
            topShare: 43,
            deltaShare: 6.8,
          },
          items: SALES_TYPE.EXAMPLE_SALES_SOURCE_DATA,
        },
      });
    }

    if (isOrderChannelMetricCardCode(cardCode)) {
      return HttpResponse.json<
        SuccessResponse<GetIncomeStructureByOrderChannelResponseDto>
      >({
        success: true,
        message: 'Success',
        data: {
          insight: {
            topType: 'KIOSK',
            topShare: 50,
            deltaShare: 4,
          },
          items: ORDER_CHANNEL.EXAMPLE_ORDER_CHANNEL_DATA,
        },
      });
    }

    if (isPaymentMethodMetricCardCode(cardCode)) {
      return HttpResponse.json<
        SuccessResponse<GetIncomeStructureByPaymentMethodResponseDto>
      >({
        success: true,
        message: 'Success',
        data: {
          insight: {
            topType: 'CASH',
            topShare: 46,
            deltaShare: 6.7,
          },
          items: PAYMENT_METHOD.EXAMPLE_PAYMENT_METHOD_DATA,
        },
      });
    }

    if (isWeekdaySalesPatternMetricCardCode(cardCode)) {
      return HttpResponse.json<SuccessResponse<GetDetailSalesByDayResponseDto>>(
        {
          success: true,
          message: 'Success',
          data: {
            topDay: '금',
            isSignificant: false,
            items: SALES_BY_DAY.EXAMPLE_DATA,
          },
        },
      );
    }

    if (isMenuMetricCardCodes(cardCode)) {
      if (
        cardCode === 'MNU_01_01' ||
        cardCode === 'MNU_01_04' ||
        cardCode === 'MNU_01_05'
      ) {
        return HttpResponse.json<
          SuccessResponse<GetMenuSalesRankingResponseDto>
        >({
          success: true,
          message: 'Success',
          data: {
            items: getItemsWithRandomLength(menuSalesRankItems.items),
          },
        });
      }

      if (cardCode === 'MNU_04_01') {
        return HttpResponse.json<
          SuccessResponse<GetIngredientUsageRankingResponseDto>
        >({
          success: true,
          message: 'Success',
          data: {
            ...ingredientConsumptionRankItems,
            items: getItemsWithRandomLength(
              ingredientConsumptionRankItems.items,
            ),
          },
        });
      }

      if (cardCode === 'MNU_05_04' || cardCode === 'MNU_05_05') {
        return HttpResponse.json<
          SuccessResponse<GetPopularMenuCombinationResponseDto>
        >({
          success: true,
          message: 'Success',
          data: {
            items: getPopularMenuCombinationItemsWithRandomLength(
              menuCombinationRankItems.items,
            ),
          },
        });
      }
    }
    return passthrough();
  }),
];

export const analysisHandler = [...getHandler];
