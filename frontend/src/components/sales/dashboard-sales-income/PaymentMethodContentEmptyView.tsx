import { CreditCard } from 'lucide-react';

export const PaymentMethodContentEmptyView = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <div className="bg-brand-50 size-10 rounded-full p-2">
        <CreditCard className="text-brand-main size-full" />
      </div>
      <p className="title-medium-bold text-grey-900 text-center whitespace-pre">
        결제 내역이 없어요
      </p>
      <span className="body-medium-medium text-grey-600 text-center whitespace-pre">
        카드, 현금, 간편결제 등으로{'\n'}결제된 내역이 없습니다.
      </span>
    </div>
  );
};
