import { IPlanningEntry } from '../types/IPlanning';

const transformPlanningEntriesForDisplay = (entries: IPlanningEntry[]) => {
  return entries.map((entry) => ({
    ...entry,
    weeklyData: Object.fromEntries(
      entry.weeklyData.map((data) => [
        data.week,
        {
          salesUnits: data.salesUnits,
          salesDollars: data.salesDollars,
          gmDollars: data.gmDollars,
          gmPercentage: data.gmPercentage,
        },
      ])
    ),
  }));
};

export default transformPlanningEntriesForDisplay;
