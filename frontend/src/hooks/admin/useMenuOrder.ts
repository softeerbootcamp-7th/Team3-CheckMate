import { useMemo, useReducer } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  ORDER_CHANNEL_OPTIONS,
  PAYMENT_OPTIONS,
  SALES_TYPE_OPTIONS,
} from '@/constants/admin';
import { postOrder } from '@/services/menu';
import type { Menu, MenuCategory } from '@/types/menu';

interface OrderedMenu {
  menuId: Menu['menuId'];
  quantity: number;
}

const initialState = {
  orderedMenus: [] as OrderedMenu[],
  salesType: SALES_TYPE_OPTIONS[0].value,
  orderChannel: ORDER_CHANNEL_OPTIONS[0].value,
  paymentMethod: PAYMENT_OPTIONS[0].value,
} as const;

type Action =
  | {
      type: 'setSalesType' | 'setOrderChannel' | 'setPaymentMethod';
      payload: string;
    }
  | {
      type: 'addMenuToOrder' | 'removeMenuFromOrder';
      payload: {
        menuId: Menu['menuId'];
      };
    }
  | {
      type: 'changeMenuQuantity';
      payload: {
        menuId: Menu['menuId'];
        delta: number;
      };
    }
  | {
      type: 'clearOrder';
    };

const reducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case 'addMenuToOrder': {
      const targetMenu = state.orderedMenus.find(
        (item) => item.menuId === action.payload.menuId,
      );

      if (targetMenu) {
        return {
          ...state,
          orderedMenus: state.orderedMenus.map((item) => {
            if (item.menuId !== action.payload.menuId) {
              return item;
            }

            return { ...item, quantity: item.quantity + 1 };
          }),
        };
      }
      return {
        ...state,
        orderedMenus: [
          ...state.orderedMenus,
          { menuId: action.payload.menuId, quantity: 1 },
        ],
      };
    }
    case 'removeMenuFromOrder':
      return {
        ...state,
        orderedMenus: state.orderedMenus.filter(
          (item) => item.menuId !== action.payload.menuId,
        ),
      };
    case 'changeMenuQuantity':
      return {
        ...state,
        orderedMenus: state.orderedMenus
          .map((item) => {
            if (item.menuId !== action.payload.menuId) {
              return item;
            }

            return { ...item, quantity: item.quantity + action.payload.delta };
          })
          .filter((item) => item.quantity > 0),
      };
    case 'setSalesType':
      return { ...state, salesType: action.payload };
    case 'setOrderChannel':
      return { ...state, orderChannel: action.payload };
    case 'setPaymentMethod':
      return { ...state, paymentMethod: action.payload };
    case 'clearOrder':
      return initialState;
  }
};

interface UseMenuOrderProps {
  menuListWithCategory: MenuCategory[];
}

export const useMenuOrder = ({ menuListWithCategory }: UseMenuOrderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const menuList = useMemo(() => {
    return menuListWithCategory.flatMap((menu) => menu.menus);
  }, [menuListWithCategory]);

  const menuMap = useMemo(() => {
    return new Map(menuList.map((menu) => [menu.menuId, menu]));
  }, [menuList]);

  const orderItems = useMemo(() => {
    return state.orderedMenus
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
  }, [menuMap, state.orderedMenus]);

  const addMenuToOrder = (menuId: number) => {
    dispatch({ type: 'addMenuToOrder', payload: { menuId } });
  };

  const changeMenuQuantity = (menuId: number, delta: number) => {
    dispatch({ type: 'changeMenuQuantity', payload: { menuId, delta } });
  };

  const removeMenuFromOrder = (menuId: number) => {
    dispatch({ type: 'removeMenuFromOrder', payload: { menuId } });
  };

  const setSalesType = (salesType: string) => {
    dispatch({ type: 'setSalesType', payload: salesType });
  };
  const setOrderChannel = (orderChannel: string) => {
    dispatch({ type: 'setOrderChannel', payload: orderChannel });
  };
  const setPaymentMethod = (paymentMethod: string) => {
    dispatch({ type: 'setPaymentMethod', payload: paymentMethod });
  };

  const { mutate: postOrderMutation, isPending: isPostingOrder } = useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      toast.success('주문이 성공했습니다.');
      dispatch({ type: 'clearOrder' });
    },
    onError: (error) => {
      toast.error(error.message ?? '주문에 실패했어요. 다시 시도해주세요.');
    },
  });

  return {
    menuOrderState: state,
    menuList,
    orderItems,
    addMenuToOrder,
    changeMenuQuantity,
    removeMenuFromOrder,
    setSalesType,
    setOrderChannel,
    setPaymentMethod,
    postOrderMutation,
    isPostingOrder,
  };
};
