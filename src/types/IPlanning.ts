export interface IPlanningWeekData {
  week: string;
  salesUnits: number;
  salesDollars: number;
  gmDollars: number;
  gmPercentage: number;
}

export interface IPlanningEntry {
  id: string;
  storeId: number;
  store: string;
  skuId: number;
  sku: string;
  cost: number;
  price: number;
  weeklyData: IPlanningWeekData[];
}

export interface IPlanningEntryDisplay {
  id: string;
  store: string;
  sku: string;
  weeklyData: {
    [week: string]: {
      salesUnits: number;
      salesDollars: number;
      gmDollars: number;
      gmPercentage: number;
    };
  };
}
