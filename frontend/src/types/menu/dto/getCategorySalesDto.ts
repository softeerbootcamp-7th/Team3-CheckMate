export interface CategorySales {
  category: string;
  totalSalesAmount: number;
}

export interface GetCategorySalesResponseDto {
  items: CategorySales[];
}
