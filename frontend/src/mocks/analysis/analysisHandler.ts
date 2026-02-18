import { HttpResponse, passthrough } from 'msw';

import {
  isOrderChannelMetricCardCode,
  isPaymentMethodMetricCardCode,
  isSalesTypeMetricCardCode,
} from '@/constants/dashboard';
import { ORDER_CHANNEL, PAYMENT_METHOD, SALES_TYPE } from '@/constants/sales';
import type { SuccessResponse } from '@/services/shared';
import type {
  GetIncomeStructureByOrderChannelResponseDto,
  GetIncomeStructureByPaymentMethodResponseDto,
  GetIncomeStructureBySalesTypeResponseDto,
} from '@/types/sales';

import { mswHttp } from '../shared';

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
    return passthrough();
  }),
];

export const analysisHandler = [...getHandler];
