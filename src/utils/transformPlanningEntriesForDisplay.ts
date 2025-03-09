import { IPlanningEntry } from '../types/IPlanning';

// Transforms planning entries into a structured format for display.
// Converts the weekly data array into an object with weeks as keys for easier access.
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
