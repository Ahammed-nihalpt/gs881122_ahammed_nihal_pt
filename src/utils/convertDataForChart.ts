import { IPlanningEntry } from '../types/IPlanning';

const convertDataForChart = (
  entries: IPlanningEntry[]
): { week: string; gmDollars: number; gmPercent: number }[] => {
  const mappedData: Record<string, { week: string; gmDollars: number; gmPercent: number }> = {};

  entries.forEach((entry) => {
    entry.weeklyData.forEach((weekData) => {
      const { week, gmDollars, gmPercentage } = weekData;

      if (!mappedData[week]) {
        mappedData[week] = { week, gmDollars, gmPercent: gmPercentage };
      } else {
        mappedData[week].gmDollars += gmDollars;
      }
    });
  });

  return Object.values(mappedData);
};

export default convertDataForChart;
