import { useMemo, useState } from 'react';

import type { LucideIcon } from 'lucide-react';
import {
  Bike,
  CreditCard,
  Grid2x2,
  House,
  Minus,
  Monitor,
  Plus,
  ShoppingBag,
  Smartphone,
  TabletSmartphone,
  Trash2,
  Wallet,
} from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';
import { cn } from '@/utils/shared';

interface MenuItem {
  id: number;
  name: string;
  price: number;
}

interface ToggleOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface OrderedMenu {
  menuId: number;
  quantity: number;
}

const MENU_ITEMS: MenuItem[] = Array.from({ length: 15 }, (_, index) => {
  const itemNumber = index + 1;

  return {
    id: itemNumber,
    name: `메뉴 ${itemNumber}`,
    price: 4000 + itemNumber * 500,
  };
});

const SALES_TYPE_OPTIONS: ToggleOption[] = [
  { value: 'hall', label: '홀', icon: House },
  { value: 'delivery', label: '배달', icon: Bike },
  { value: 'takeout', label: '포장', icon: ShoppingBag },
];

const ORDER_CHANNEL_OPTIONS: ToggleOption[] = [
  { value: 'pos', label: 'POS', icon: Monitor },
  { value: 'kiosk', label: '키오스크', icon: TabletSmartphone },
  { value: 'app', label: '배달앱', icon: Smartphone },
];

const PAYMENT_OPTIONS: ToggleOption[] = [
  { value: 'card', label: '카드', icon: CreditCard },
  { value: 'cash', label: '현금', icon: Wallet },
  { value: 'simple', label: '간편 결제' },
  { value: 'etc', label: '기타' },
];

const formatPrice = (price: number) => {
  return `${new Intl.NumberFormat('ko-KR').format(price)}원`;
};

export const AdminPage = () => {
  const [orderedMenus, setOrderedMenus] = useState<OrderedMenu[]>([]);
  const [salesType, setSalesType] = useState(SALES_TYPE_OPTIONS[0].value);
  const [orderChannel, setOrderChannel] = useState(
    ORDER_CHANNEL_OPTIONS[0].value,
  );
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_OPTIONS[0].value);

  const menuMap = useMemo(() => {
    return new Map(MENU_ITEMS.map((menu) => [menu.id, menu]));
  }, []);

  const orderItems = useMemo(() => {
    return orderedMenus
      .map((orderedMenu) => {
        const menu = menuMap.get(orderedMenu.menuId);

        if (!menu) {
          return null;
        }

        return {
          ...orderedMenu,
          menu,
          linePrice: menu.price * orderedMenu.quantity,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [menuMap, orderedMenus]);

  const totalPrice = useMemo(() => {
    return orderItems.reduce((sum, item) => sum + item.linePrice, 0);
  }, [orderItems]);

  const addMenuToOrder = (menuId: number) => {
    setOrderedMenus((prev) => {
      const targetMenu = prev.find((item) => item.menuId === menuId);

      if (!targetMenu) {
        return [...prev, { menuId, quantity: 1 }];
      }

      return prev.map((item) => {
        if (item.menuId !== menuId) {
          return item;
        }

        return { ...item, quantity: item.quantity + 1 };
      });
    });
  };

  const changeMenuQuantity = (menuId: number, delta: number) => {
    setOrderedMenus((prev) => {
      return prev
        .map((item) => {
          if (item.menuId !== menuId) {
            return item;
          }

          return { ...item, quantity: item.quantity + delta };
        })
        .filter((item) => item.quantity > 0);
    });
  };

  const removeMenuFromOrder = (menuId: number) => {
    setOrderedMenus((prev) => {
      return prev.filter((item) => item.menuId !== menuId);
    });
  };

  return (
    <div className="bg-grey-900 min-h-screen w-full overflow-x-auto p-2">
      <section className="bg-grey-0 rounded-500 border-grey-300 mx-auto flex h-[calc(100vh-1rem)] min-h-[780px] min-w-[1320px] flex-col overflow-hidden border">
        {/* ===== Header 영역 ===== */}
        <header className="border-grey-300 flex h-16 shrink-0 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <div className="bg-brand-50 text-brand-main rounded-200 body-large-semibold flex size-8 items-center justify-center">
              ✓
            </div>
            <p className="title-small text-grey-900 font-semibold">Checkmate</p>
            <span className="text-grey-300">|</span>
            <p className="body-large-semibold text-grey-700">관리자 페이지</p>
          </div>

          <div className="body-medium-medium text-grey-700 flex items-center gap-8">
            <p>
              유저 이메일 :{' '}
              <span className="body-medium-semibold text-grey-900">
                admin@test.com
              </span>
            </p>
            <p>
              매장 연동 :{' '}
              <span className="body-medium-semibold text-grey-900">YES</span>
              <span className="text-grey-400"> / NO</span>
            </p>
            <p>
              POS 연동 :{' '}
              <span className="body-medium-semibold text-grey-900">YES</span>
              <span className="text-grey-400"> / NO</span>
            </p>
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {/* ===== 좌측 메뉴 그리드 영역 ===== */}
          <div className="bg-grey-200 min-h-0 flex-1 p-4">
            <div className="grid h-full auto-rows-[270px] grid-cols-5 gap-4 overflow-y-auto pr-2">
              {MENU_ITEMS.map((menu) => {
                const isSelected = orderItems.some(
                  (orderItem) => orderItem.menuId === menu.id,
                );

                return (
                  <button
                    key={menu.id}
                    type="button"
                    onClick={() => {
                      addMenuToOrder(menu.id);
                    }}
                    className={cn(
                      'rounded-400 border-grey-200 bg-grey-100 text-grey-700 hover:border-brand-300 flex flex-col items-center justify-center border text-center transition-colors',
                      isSelected &&
                        'border-brand-main bg-brand-20 text-grey-900',
                    )}
                  >
                    <p className="title-small font-semibold">{menu.name}</p>
                    <p className="body-large-medium text-grey-500 mt-2">
                      {formatPrice(menu.price)}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="border-grey-300 bg-grey-100 flex h-full w-[430px] shrink-0 flex-col border-l">
            {/* ===== 우측 주문서 상단(빈 상태/선택 상태) ===== */}
            <section className="border-grey-300 flex h-[390px] flex-col border-b">
              <div className="border-grey-300 flex items-center justify-between border-b px-6 py-5">
                <h2 className="title-small text-grey-900 font-semibold">
                  주문서
                </h2>
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
                            <button
                              type="button"
                              onClick={() => {
                                changeMenuQuantity(orderItem.menuId, -1);
                              }}
                              className="text-grey-600 hover:bg-grey-200 rounded-150 flex size-7 items-center justify-center transition-colors"
                              aria-label={`${orderItem.menu.name} 수량 감소`}
                            >
                              <Minus className="size-3.5" />
                            </button>
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
                            {formatPrice(orderItem.linePrice)}
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
                <p className="title-small text-grey-700 font-semibold">
                  총 결제금액
                </p>
                <p className="title-large text-brand-main font-semibold">
                  {formatPrice(totalPrice)}
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
              >
                주문하기
              </Button>
            </section>
          </aside>
        </div>
      </section>
    </div>
  );
};

interface ToggleSectionProps {
  title: string;
  value: string;
  options: ToggleOption[];
  layout: 'compact' | 'full';
  onValueChange: (value: string) => void;
}

const ToggleSection = ({
  title,
  value,
  options,
  layout,
  onValueChange,
}: ToggleSectionProps) => {
  return (
    <article>
      <p className="body-medium-semibold text-grey-700 mb-2">{title}</p>
      <div
        className={cn(
          'bg-grey-200 border-grey-300 rounded-250 w-full border p-1',
          layout === 'compact' && 'grid grid-cols-3 gap-1',
          layout === 'full' && 'grid grid-cols-4 gap-1',
        )}
      >
        {options.map((option) => {
          const Icon = option.icon;
          const isActive = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onValueChange(option.value);
              }}
              className={cn(
                'body-medium-semibold text-grey-600 rounded-200 h-9 min-w-0 border px-2 transition-colors',
                isActive
                  ? 'bg-grey-0 text-grey-900 border-grey-300'
                  : 'hover:bg-grey-300 border-transparent bg-transparent',
              )}
            >
              {Icon && <Icon className="mr-1 inline size-3.5 align-[-2px]" />}
              <span className="truncate whitespace-nowrap">{option.label}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
};
