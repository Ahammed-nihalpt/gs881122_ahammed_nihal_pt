import { IPlanningEntry } from '../types/IPlanning';

export const calculateStoreTotals = (entries: IPlanningEntry[]) => {
  let totalSalesDollars = 0;
  let totalGMDollars = 0;

  entries.forEach((entry) => {
    entry.weeklyData.forEach((week) => {
      totalSalesDollars += week.salesDollars;
      totalGMDollars += week.gmDollars;
    });
  });

  const totalGMPercentage = (totalGMDollars / totalSalesDollars) * 100;

  return {
    totalGMDollars,
    totalGMPercentage: isNaN(totalGMPercentage) ? 0 : totalGMPercentage,
  };
};
