import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlanningEntry } from '../../types/IPlanning';
import { IStore } from '../../types/IStores';
import { ISKU } from '../../types/ISKU';

const weeks = Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`);

const planningSlice = createSlice({
  name: 'planning',
  initialState: [] as IPlanningEntry[],
  reducers: {
    initializePlanningData: (_, action: PayloadAction<{ stores: IStore[]; skus: ISKU[] }>) => {
      const { stores, skus } = action.payload;

      return stores.flatMap((store) =>
        skus.map((sku) => ({
          id: `${store.id}-${sku.id}`,
          store: store.name,
          sku: sku.name,
          cost: sku.cost,
          price: sku.price,
          weeklyData: weeks.map((week) => ({
            week,
            salesUnits: 0,
            salesDollars: 0,
            gmDollars: 0,
            gmPercentage: 0,
          })),
        }))
      );
    },

    updateSalesUnits: (
      state,
      action: PayloadAction<{ id: string; week: string; salesUnits: number }>
    ) => {
      const entry = state.find((row) => row.id === action.payload.id);
      if (entry) {
        const weekData = entry.weeklyData.find((w) => w.week === action.payload.week);
        if (weekData) {
          weekData.salesUnits = action.payload.salesUnits;
          weekData.salesDollars = weekData.salesUnits * entry.price;
          weekData.gmDollars = weekData.salesDollars - weekData.salesUnits * entry.cost;
          const gmPercentage =
            weekData.salesDollars !== 0 ? (weekData.gmDollars / weekData.salesDollars) * 100 : 0;
          weekData.gmPercentage = isNaN(gmPercentage) ? 0 : gmPercentage;
        }
      }
    },
  },
});
export const { initializePlanningData, updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;
