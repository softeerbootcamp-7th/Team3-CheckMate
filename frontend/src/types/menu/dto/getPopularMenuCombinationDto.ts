export interface PairedMenu {
  menuName: string;
  count: number;
}
// PopularMenuCombination 예시
// {
//       "baseMenuName": "불고기 버거",
//       "pairedMenus": [
//         { "menuName": "감자튀김", "count": 80 },
//         { "menuName": "콜라", "count": 70 }
//       ]
//     }
export interface PopularMenuCombination {
  baseMenuName: string | null;
  pairedMenus: PairedMenu[] | null;
}

export interface GetPopularMenuCombinationResponseDto {
  items: PopularMenuCombination[];
}
