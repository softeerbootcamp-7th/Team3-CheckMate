import { Inbox } from 'lucide-react';

export const OrderChannelContentEmptyView = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="bg-brand-50 size-10 rounded-full p-2">
        <Inbox className="text-brand-main size-full" />
      </div>
      <p className="title-medium-bold text-grey-900 text-center whitespace-pre">
        주문 내역이 없어요
      </p>
      <span className="body-medium-medium text-grey-600 text-center whitespace-pre">
        POS, 키오스크, 배달앱 등을 통해{'\n'}주문된 내역이 없습니다.
      </span>
    </div>
  );
};
