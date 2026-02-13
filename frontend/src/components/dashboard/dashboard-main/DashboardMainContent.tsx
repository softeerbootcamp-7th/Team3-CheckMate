import { DASHBOARD_METRIC_CARDS } from '@/constants/dashboard';
import type { DashboardCard } from '@/types/dashboard';

interface DashboardMainContentProps {
  cards: DashboardCard[];
}

export const DashboardMainContent = ({ cards }: DashboardMainContentProps) => {
  return (
    <div className="mb-10 grid h-181 w-full grid-cols-3 grid-rows-3 gap-5">
      {cards.map((item) => {
        const card = DASHBOARD_METRIC_CARDS[item.cardCode];
        return (
          <div
            key={`dashboard-card-${item.cardCode}`}
            className="rounded-400 bg-special-card-bg p-5"
            style={{
              gridColumn: `${item.colNo} / span ${card.sizeX}`,
              gridRow: `${item.rowNo} / span ${card.sizeY}`,
            }}
          >
            카드 {item.cardCode}
          </div>
        );
      })}
    </div>
  );
};
