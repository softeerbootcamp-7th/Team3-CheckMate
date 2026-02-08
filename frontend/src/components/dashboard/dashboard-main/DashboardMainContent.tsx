import type { DashboardGridItem } from '@/types/dashboard';

interface DashboardMainContentProps {
  gridItems: DashboardGridItem[];
}

export const DashboardMainContent = ({
  gridItems,
}: DashboardMainContentProps) => {
  return (
    <div className="mb-10 grid h-181 w-full grid-cols-3 grid-rows-3 gap-5">
      {gridItems.map((item) => (
        <div
          key={`dashboard-card-${item.id}`}
          className="rounded-400 bg-special-card-bg p-5"
          style={{
            gridColumn: `${item.posX} / span ${item.sizeX}`,
            gridRow: `${item.posY} / span ${item.sizeY}`,
          }}
        >
          카드 {item.id}
        </div>
      ))}
    </div>
  );
};
