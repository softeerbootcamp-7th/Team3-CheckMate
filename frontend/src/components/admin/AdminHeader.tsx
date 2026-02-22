import { ListOrdered, SlidersHorizontal } from 'lucide-react';

import { CDN_BASE_URL } from '@/constants/shared';
import type { AdminMenuTab } from '@/types/admin';
import type { GetAuthStatusResponseDto } from '@/types/auth';
import { cn } from '@/utils/shared';

interface AdminHeaderProps {
  authStatus: GetAuthStatusResponseDto;
  activeTab: AdminMenuTab;
  onTabChange: (tab: AdminMenuTab) => void;
}

export const AdminHeader = ({
  authStatus,
  activeTab,
  onTabChange,
}: AdminHeaderProps) => {
  const { email, hasStore, hasPosIntegration } = authStatus;

  const statusText = (status: boolean) => {
    if (status) {
      return 'YES';
    }
    return 'NO';
  };

  return (
    <header className="border-grey-300 flex shrink-0 items-center justify-between border-b px-6 py-5">
      <div className="flex items-center gap-4">
        <object
          data={`${CDN_BASE_URL}/assets/images/logoWithTitle.svg`}
          height={40}
        />
        <span className="text-grey-300">|</span>
        <p className="body-large-semibold text-grey-700">관리자 페이지</p>
        <div className="bg-grey-200 border-grey-300 rounded-250 ml-4 flex h-10 items-center gap-1 border p-1">
          <button
            type="button"
            onClick={() => {
              onTabChange('menu-order');
            }}
            className={cn(
              'body-medium-semibold text-grey-600 rounded-200 flex h-8 items-center gap-1.5 px-4',
              activeTab === 'menu-order' &&
                'bg-grey-0 text-brand-main border-grey-300 border',
            )}
          >
            <ListOrdered className="size-3.5" />
            메뉴 주문
          </button>
          <button
            type="button"
            onClick={() => {
              onTabChange('menu-register');
            }}
            className={cn(
              'body-medium-semibold text-grey-600 rounded-200 flex h-8 items-center gap-1.5 px-4',
              activeTab === 'menu-register' &&
                'bg-grey-0 text-brand-main border-grey-300 border',
            )}
          >
            <SlidersHorizontal className="size-3.5" />
            메뉴 등록
          </button>
        </div>
      </div>
      <div className="body-medium-medium text-grey-700 flex items-center gap-8">
        <p>
          유저 이메일 :{' '}
          <span className="body-medium-semibold text-grey-900">{email}</span>
        </p>
        <p>
          매장 연동 :{' '}
          <span className="body-medium-semibold text-grey-900">
            {statusText(hasStore)}
          </span>
        </p>
        <p>
          POS 연동 :{' '}
          <span className="body-medium-semibold text-grey-900">
            {statusText(hasPosIntegration)}
          </span>
        </p>
      </div>
    </header>
  );
};
