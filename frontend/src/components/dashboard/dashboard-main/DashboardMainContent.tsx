import { useNavigate } from 'react-router-dom';

import { DefaultCardWrapper } from '@/components/shared';
import { DefaultCardFetchBoundary } from '@/components/shared/default-card-fetch-boundary';
import {
  DASHBOARD_METRIC_CARDS,
  isMenuMetricCardCode,
  isSalesMetricCardCode,
  type MetricCardCode,
} from '@/constants/dashboard';
import { ROUTE_PATHS } from '@/constants/shared';
import type { DashboardCard } from '@/types/dashboard';

import { DashboardCard as DashboardCardComponent } from './DashboardCard';

interface DashboardMainContentProps {
  cards: DashboardCard[];
}

export const DashboardMainContent = ({ cards }: DashboardMainContentProps) => {
  const navigate = useNavigate();

  const handleClickChevronRightIcon = (cardCode: MetricCardCode) => {
    const analysisPath = ROUTE_PATHS.ANALYSIS.BASE;
    if (isSalesMetricCardCode(cardCode)) {
      navigate(`${analysisPath}/${ROUTE_PATHS.ANALYSIS.SALES}`);
      return;
    }
    if (isMenuMetricCardCode(cardCode)) {
      navigate(`${analysisPath}/${ROUTE_PATHS.ANALYSIS.MENU}`);
      return;
    }
  };

  return (
    <div className="mb-10 grid h-181 w-full grid-cols-3 grid-rows-3 gap-5">
      {cards.map((item) => {
        const card = DASHBOARD_METRIC_CARDS[item.cardCode];
        const fallbackStyle = {
          gridColumn: `${item.colNo} / span ${card.sizeX}`,
          gridRow: `${item.rowNo} / span ${card.sizeY}`,
        };
        const fallbackClassName = 'size-full';

        return (
          <DefaultCardFetchBoundary
            key={`dashboard-card-${item.cardCode}`}
            errorFallbackClassName={fallbackClassName}
            errorFallbackStyle={fallbackStyle}
            loadingFallbackClassName={fallbackClassName}
            loadingFallbackStyle={fallbackStyle}
          >
            <DefaultCardWrapper
              className="rounded-400 bg-special-card-bg size-full p-5"
              style={{
                gridColumn: `${item.colNo} / span ${card.sizeX}`,
                gridRow: `${item.rowNo} / span ${card.sizeY}`,
              }}
              title={card.label}
              hasChevronRightIcon
              onClickChevronRightIcon={() =>
                handleClickChevronRightIcon(item.cardCode)
              }
            >
              <DashboardCardComponent cardCode={item.cardCode} />
            </DefaultCardWrapper>
          </DefaultCardFetchBoundary>
        );
      })}
    </div>
  );
};
