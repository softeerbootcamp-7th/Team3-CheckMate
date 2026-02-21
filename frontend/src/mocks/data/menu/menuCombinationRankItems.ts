import type { GetPopularMenuCombinationResponseDto } from '@/types/menu';

export const menuCombinationRankItems: GetPopularMenuCombinationResponseDto = {
  items: [
    {
      baseMenuName: '아메리카노(ICE)',
      pairedMenus: [
        { menuName: '리얼치즈케이크', count: 9999 },
        { menuName: '에그타르트', count: 231 },
        { menuName: '생딸기 케이크', count: 123 },
        { menuName: '초코머핀', count: 89 },
        { menuName: '크루아상', count: 69 },
      ],
    },
    {
      baseMenuName: '초코라떼(ICE)',
      pairedMenus: [
        { menuName: '에그타르트', count: 181 },
        { menuName: '아메리카노(ICE)', count: 93 },
        { menuName: '크루아상', count: 92 },
        { menuName: '녹차라떼(HOT)', count: 21 },
        { menuName: '초코머핀', count: 14 },
      ],
    },
    {
      baseMenuName: '녹차라떼(HOT)',
      pairedMenus: [
        { menuName: '생딸기 케이크', count: 91 },
        { menuName: '크루아상', count: 67 },
        { menuName: '생딸기 크루아상', count: 42 },
        { menuName: 'BLT 샌드위치', count: 38 },
        { menuName: '리얼치즈케이크', count: 12 },
      ],
    },
  ],
};
