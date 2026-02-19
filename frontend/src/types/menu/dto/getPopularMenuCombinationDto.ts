export interface PairedMenu {
  menuName: string;
  count: number;
}
// PoplularMenuCombination 예시
// {
//       "baseMenuName": "불고기 버거",
//       "pairedMenus": [
//         { "menuName": "감자튀김", "count": 80 },
//         { "menuName": "콜라", "count": 70 }
//       ]
//     }
export interface PoplularMenuCombination {
  baseMenuName: string;
  pairedMenus: PairedMenu[];
}

export interface GetPopularMenuCombinationResponseDto {
  items: PoplularMenuCombination[];
}
