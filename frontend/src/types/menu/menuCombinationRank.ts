export interface MenuCombinationRank {
  rank: number;
  menuName: string;
  combinationRank: {
    rank: number;
    menuName: string;
    totalOrderCount: number;
  }[];
}
