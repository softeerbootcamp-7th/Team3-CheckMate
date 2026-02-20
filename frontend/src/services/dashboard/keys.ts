import type { GetAnalysisDetailQuery } from '@/types/analysis';

export const dashboardKeys = {
  all: ['dashboard'] as const,
  list: () => [...dashboardKeys.all, 'list'] as const,
  name: (dashboardId: number | string) =>
    [...dashboardKeys.all, 'detail', dashboardId] as const,
  cards: (dashboardId: number | string) =>
    [...dashboardKeys.name(dashboardId), 'cards'] as const,
  cardDetail: (dashboardId: number | string, query: GetAnalysisDetailQuery) =>
    [
      ...dashboardKeys.cards(dashboardId),
      query.analysisCardCode,
      {
        customPeriod: query.customPeriod,
        from: query.from ?? null,
        to: query.to ?? null,
      },
    ] as const,
};
