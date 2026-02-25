import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  useMutation,
  useQueryClient,
  useSuspenseQueries,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  AdminHeader,
  AdminMenuGrid,
  AdminMenuOrderSection,
  AdminMenuRegisterForm,
} from '@/components/admin';
import { useMenuOrder } from '@/hooks/admin';
import { authOptions } from '@/services/auth';
import { menuKeys, menuOptions, postMenus } from '@/services/menu';
import type { AdminMenuTab } from '@/types/admin';
import type { MenuRegisterForm } from '@/types/menu';

const AdminPage = () => {
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<AdminMenuTab>('menu-order');

  const [{ data: authStatus }, { data: menuListWithCategory }] =
    useSuspenseQueries({
      queries: [authOptions.status, menuOptions.list()],
    });

  const {
    menuOrderState: { salesType, orderChannel, paymentMethod },
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
  } = useMenuOrder({ menuListWithCategory });

  const methods = useForm<MenuRegisterForm>({
    defaultValues: {
      name: '',
      category: '',
      price: 0,
    },
    mode: 'all',
  });

  const { mutate: postMenusMutation } = useMutation({
    mutationFn: postMenus,
    onSuccess: async () => {
      methods.reset();
      await queryClient.invalidateQueries({
        queryKey: menuKeys.list(),
      });
    },
    onError: (error) => {
      toast.error(
        error.message ?? '메뉴 등록에 실패했어요. 다시 시도해주세요.',
      );
    },
  });

  const handleSubmitNewMenu = methods.handleSubmit((data) => {
    const body = {
      menus: [data],
    };

    postMenusMutation(body);
  });

  return (
    <div className="bg-grey-0 min-h-screen w-full overflow-x-auto">
      <section className="mx-auto flex h-screen min-h-[780px] min-w-[1320px] flex-col overflow-hidden">
        {/* ===== Header 영역 ===== */}
        <AdminHeader
          authStatus={authStatus}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="flex min-h-0 flex-1">
          {/* ===== 좌측 메뉴 그리드 영역 ===== */}
          <AdminMenuGrid
            menuList={menuList}
            orderMenus={orderItems}
            onMenuClick={addMenuToOrder}
          />
          <aside className="border-grey-300 bg-grey-100 flex h-full w-[430px] shrink-0 flex-col border-l">
            {activeTab === 'menu-order' && (
              <AdminMenuOrderSection
                orderItems={orderItems}
                removeMenuFromOrder={removeMenuFromOrder}
                changeMenuQuantity={changeMenuQuantity}
                salesType={salesType}
                orderChannel={orderChannel}
                paymentMethod={paymentMethod}
                setSalesType={setSalesType}
                setOrderChannel={setOrderChannel}
                setPaymentMethod={setPaymentMethod}
                postOrderMutation={postOrderMutation}
                isPostingOrder={isPostingOrder}
              />
            )}

            {activeTab === 'menu-register' && (
              <FormProvider {...methods}>
                <AdminMenuRegisterForm handleSubmit={handleSubmitNewMenu} />
              </FormProvider>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
};

export default AdminPage;
