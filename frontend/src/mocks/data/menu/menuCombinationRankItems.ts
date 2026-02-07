import type { MenuCombinationRank } from '@/types/menu';

export const menuCombinationRankItems: MenuCombinationRank[] = [
  {
    rank: 1,
    menuName: '아메리카노(ICE)',
    combinationRank: [
      { rank: 1, menuName: '리얼치즈케이크', totalOrderCount: 9999 },
      { rank: 2, menuName: '에그타르트', totalOrderCount: 231 },
      { rank: 3, menuName: '생딸기 케이크', totalOrderCount: 123 },
      { rank: 4, menuName: '초코머핀', totalOrderCount: 89 },
      { rank: 5, menuName: '크루아상', totalOrderCount: 69 },
    ],
  },
  {
    rank: 2,
    menuName: '초코라떼(ICE)',
    combinationRank: [
      { rank: 1, menuName: '에그타르트', totalOrderCount: 181 },
      { rank: 2, menuName: '아메리카노(ICE)', totalOrderCount: 93 },
      { rank: 3, menuName: '크루아상', totalOrderCount: 92 },
      { rank: 4, menuName: '녹차라떼(HOT)', totalOrderCount: 21 },
      { rank: 5, menuName: '초코머핀', totalOrderCount: 14 },
    ],
  },
  {
    rank: 3,
    menuName: '녹차라떼(HOT)',
    combinationRank: [
      { rank: 1, menuName: '생딸기 케이크', totalOrderCount: 91 },
      { rank: 2, menuName: '크루아상', totalOrderCount: 67 },
      { rank: 3, menuName: '생딸기 크루아상', totalOrderCount: 42 },
      { rank: 4, menuName: 'BLT 샌드위치', totalOrderCount: 38 },
      { rank: 5, menuName: '리얼치즈케이크', totalOrderCount: 12 },
    ],
  },
];
