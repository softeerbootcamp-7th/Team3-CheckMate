export const dashboardKeys = {
  all: ['dashboard'] as const,
  list: () => [...dashboardKeys.all, 'list'] as const,
  name: (dashboardId: number | string) =>
    [...dashboardKeys.all, 'detail', dashboardId] as const,
  cards: (dashboardId: number | string) =>
    [...dashboardKeys.name(dashboardId), 'cards'] as const,
};
