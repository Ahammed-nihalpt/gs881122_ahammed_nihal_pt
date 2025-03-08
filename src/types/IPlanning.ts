export interface IPlanning {
  salesData: ISalesData[];
}

export interface ISalesData {
  storeId: string;
  skuId: string;
  week: string;
  salesUnits: number;
}
