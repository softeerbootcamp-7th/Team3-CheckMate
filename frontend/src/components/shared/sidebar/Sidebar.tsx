import { ChatSheet } from '@/components/ai-chat';
import { SIDEBAR_ITEMS } from '@/constants/shared';
import type { SidebarOptionItem } from '@/types/shared';

import { SidebarMenuItem } from './SidebarMenuItem';

export const Sidebar = () => {
  return (
    <aside className="bg-grey-0 h-full w-75 shrink-0">
      <img
        src="/assets/logoWithTitle.svg"
        alt="Logo"
        className="mx-auto mt-21 ml-10 h-16.5 w-41"
      />
      <ul className="mt-11.75 ml-7.25 flex w-55 flex-col gap-100">
        {SIDEBAR_ITEMS.map((menu: SidebarOptionItem) => (
          // 선택된 버튼인지를 현재 url 경로와 비교하여 판단
          <SidebarMenuItem key={menu.id} menu={menu} />
        ))}
      </ul>
      <ChatSheet />
    </aside>
  );
};
