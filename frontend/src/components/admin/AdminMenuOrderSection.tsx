import { useMemo } from 'react';

import { Grid2x2, Minus, Plus, Trash2 } from 'lucide-react';

import {
  ORDER_CHANNEL_OPTIONS,
  PAYMENT_OPTIONS,
  SALES_TYPE_OPTIONS,
} from '@/constants/admin';
import type { Menu, PostOrderRequestDto } from '@/types/menu';
import { cn, formatNumber } from '@/utils/shared';

import { Button } from '../shared/shadcn-ui';

import { ToggleSection } from './ToggleSection';

interface AdminMenuOrderSectionProps {
  orderItems: {
    menuId: Menu['menuId'];
    quantity: number;
    menu: Menu;
    linePrice: number;
  }[];
  removeMenuFromOrder: (menuId: Menu['menuId']) => void;
  changeMenuQuantity: (menuId: Menu['menuId'], delta: number) => void;
  salesType: string;
  orderChannel: string;
  paymentMethod: string;
  setSalesType: (salesType: string) => void;
  setOrderChannel: (orderChannel: string) => void;
  setPaymentMethod: (paymentMethod: string) => void;
  postOrderMutation: (body: PostOrderRequestDto) => void;
  isPostingOrder: boolean;
}

export const AdminMenuOrderSection = ({
  orderItems,
  removeMenuFromOrder,
  changeMenuQuantity,
  salesType,
  orderChannel,
  paymentMethod,
  setSalesType,
  setOrderChannel,
  setPaymentMethod,
  postOrderMutation,
  isPostingOrder,
}: AdminMenuOrderSectionProps) => {
  const totalPrice = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.linePrice, 0);
  }, [orderItems]);

  const handlePostOrder = () => {
    postOrderMutation({
      grossAmount: totalPrice,
      discountAmount: 0,
      netAmount: totalPrice,
      salesType: salesType as 'DINE_IN' | 'DELIVERY' | 'TAKE_OUT',
      orderChannel: orderChannel as 'POS' | 'KIOSK' | 'DELIVERY_APP',
      paymentMethod: paymentMethod as 'CARD' | 'CASH' | 'EASY_PAY' | 'ETC',
      menus: orderItems.map((item) => ({
        menuId: item.menuId,
        unitPrice: item.menu.price,
        quantity: item.quantity,
        lineGrossAmount: item.linePrice,
      })),
      orderedAt: new Date().toISOString(),
    });
  };

  return (
    <>
      {/* ===== 우측 주문서 상단(빈 상태/선택 상태) ===== */}
      <section className="border-grey-300 flex h-[390px] flex-col border-b">
        <div className="border-grey-300 flex items-center justify-between border-b px-6 py-5">
          <h2 className="title-small text-grey-900 font-semibold">주문서</h2>
          <span className="bg-brand-50 text-brand-main rounded-unlimit body-medium-semibold px-3 py-1">
            총 {orderItems.length}개
          </span>
        </div>

        <div className="flex min-h-0 flex-1 flex-col px-5 py-4">
          {orderItems.length === 0 && (
            <>
              <div className="bg-grey-200 text-grey-400 rounded-300 mt-auto mb-5 flex size-16 items-center justify-center self-center">
                <Grid2x2 className="size-8" />
              </div>
              <p className="body-large-semibold text-grey-500 text-center">
                선택된 메뉴가 없습니다.
              </p>
              <p className="body-medium-medium text-grey-500 mt-2 mb-auto text-center">
                왼쪽에서 메뉴를 선택해주세요.
              </p>
            </>
          )}

          {orderItems.length > 0 && (
            <div className="space-y-3 overflow-y-auto pr-1">
              {orderItems.map((orderItem) => (
                <div
                  key={orderItem.menuId}
                  className="border-grey-300 bg-grey-0 rounded-300 border p-3.5"
                >
                  <div className="flex items-center justify-between">
                    <p className="body-large-semibold text-grey-900">
                      {orderItem.menu.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        removeMenuFromOrder(orderItem.menuId);
                      }}
                      className="text-grey-400 hover:text-grey-700 flex size-7 items-center justify-center rounded-md transition-colors"
                      aria-label={`${orderItem.menu.name} 삭제`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="bg-grey-100 border-grey-300 rounded-200 flex h-9 items-center border px-1">
                      <Button
                        type="button"
                        onClick={() => {
                          changeMenuQuantity(orderItem.menuId, -1);
                        }}
                        className="text-grey-600 hover:bg-grey-200 rounded-150 flex size-7 items-center justify-center transition-colors"
                        aria-label={`${orderItem.menu.name} 수량 감소`}
                      >
                        <Minus className="size-3.5" />
                      </Button>
                      <span className="body-medium-semibold text-grey-800 w-9 text-center">
                        {orderItem.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          changeMenuQuantity(orderItem.menuId, 1);
                        }}
                        className="text-grey-600 hover:bg-grey-200 rounded-150 flex size-7 items-center justify-center transition-colors"
                        aria-label={`${orderItem.menu.name} 수량 증가`}
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>

                    <p className="title-small text-grey-900 font-semibold">
                      {formatNumber(orderItem.linePrice)}원
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== 우측 주문 옵션 토글 영역 ===== */}
      <section className="space-y-4 px-6 py-5">
        <ToggleSection
          title="판매 유형"
          value={salesType}
          options={SALES_TYPE_OPTIONS}
          layout="compact"
          onValueChange={setSalesType}
        />

        <ToggleSection
          title="주문 수단"
          value={orderChannel}
          options={ORDER_CHANNEL_OPTIONS}
          layout="compact"
          onValueChange={setOrderChannel}
        />

        <ToggleSection
          title="결제 수단"
          value={paymentMethod}
          options={PAYMENT_OPTIONS}
          layout="full"
          onValueChange={setPaymentMethod}
        />
      </section>

      {/* ===== 우측 결제 요약/주문 버튼 영역 ===== */}
      <section className="border-grey-300 mt-auto border-t px-6 py-6">
        <div className="mb-5 flex items-center justify-between">
          <p className="title-small text-grey-700 font-semibold">총 결제금액</p>
          <p className="title-large text-brand-main font-semibold">
            {formatNumber(totalPrice)}원
          </p>
        </div>

        <Button
          type="button"
          className={cn(
            'rounded-300 body-large-semibold h-14 w-full',
            orderItems.length > 0
              ? 'bg-brand-main text-grey-0 hover:bg-brand-600'
              : 'bg-grey-300 text-grey-600 hover:bg-grey-300',
          )}
          onClick={handlePostOrder}
          disabled={isPostingOrder}
        >
          주문하기
        </Button>
      </section>
    </>
  );
};
