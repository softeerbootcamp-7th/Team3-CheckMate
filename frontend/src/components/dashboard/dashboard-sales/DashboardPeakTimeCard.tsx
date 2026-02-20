import { useSuspenseQuery } from '@tanstack/react-query';

import { PeakTimeContent } from '@/components/sales';
import {
  DASHBOARD_METRICS,
  type ExtractCardCodes,
} from '@/constants/dashboard';
import { useDashboardCardDetailQueryOption } from '@/hooks/dashboard';
import type { GetDetailPeakTimeResponseDto } from '@/types/sales';

type DashboardPeakTimeCardCodes = ExtractCardCodes<
  typeof DASHBOARD_METRICS.SALES.sections.SALES_PATTERN.items.PEAK_TIME
>;

interface DashboardPeakTimeCardProps {
  cardCode: DashboardPeakTimeCardCodes;
}

export const DashboardPeakTimeCard = ({
  cardCode,
}: DashboardPeakTimeCardProps) => {
  const { createCardDetailQuery } = useDashboardCardDetailQueryOption();

  const queryOption =
    createCardDetailQuery<GetDetailPeakTimeResponseDto>(cardCode);

  const { data } = useSuspenseQuery(queryOption);

  return <PeakTimeContent peakTimeData={data} />;
};
