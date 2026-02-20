import { useSuspenseQuery } from '@tanstack/react-query';

import {
  PaymentMethodContent,
  PaymentMethodContentEmptyView,
} from '@/components/sales';
import type {
  DASHBOARD_METRICS,
  ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetIncomeStructureByPaymentMethodResponseDto } from '@/types/sales';

type DashboardIncomeStructurePaymentMethodCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.INCOME_STRUCTURE.items.PAYMENT_METHOD
>;
interface DashboardIncomeStructurePaymentMethodCardProps {
  cardCode: DashboardIncomeStructurePaymentMethodCardCodes;
}

export const DashboardIncomeStructurePaymentMethodCard = ({
  cardCode,
}: DashboardIncomeStructurePaymentMethodCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetIncomeStructureByPaymentMethodResponseDto>(
      cardCode,
    );

  const { data } = useSuspenseQuery(queryOption);

  if (data.items.length === 0) {
    return <PaymentMethodContentEmptyView />;
  }

  return (
    <PaymentMethodContent
      cardCode={cardCode}
      insight={data.insight}
      items={data.items}
    />
  );
};
