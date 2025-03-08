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
          skuId: sku.id,
          storeId: store.id,
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

    addStoreInPlan: (state, action: PayloadAction<{ store: IStore; skus: ISKU[] }>) => {
      const { store, skus } = action.payload;

      const newEntries: IPlanningEntry[] = skus.map((sku) => ({
        id: `${store.id}-${sku.id}`,
        store: store.name,
        skuId: sku.id,
        sku: sku.name,
        cost: sku.cost,
        price: sku.price,
        storeId: store.id,
        weeklyData: weeks.map((week) => ({
          week,
          salesUnits: 0,
          salesDollars: 0,
          gmDollars: 0,
          gmPercentage: 0,
        })),
      }));

      state.push(...newEntries);
    },

    addSKUInPlan: (state, action: PayloadAction<ISKU>) => {
      const newSKU = action.payload;

      const existingStores = [...new Set(state.map((entry) => entry.storeId))];

      const newEntries: IPlanningEntry[] = existingStores.map((storeId) => ({
        id: `${storeId}-${newSKU.id}`,
        store: state.find((entry) => entry.storeId === storeId)?.store || '',
        sku: newSKU.name,
        cost: newSKU.cost,
        price: newSKU.price,
        skuId: newSKU.id,
        storeId: storeId,
        weeklyData: weeks.map((week) => ({
          week,
          salesUnits: 0,
          salesDollars: 0,
          gmDollars: 0,
          gmPercentage: 0,
        })),
      }));

      state.push(...newEntries);
    },

    deleteStoreInPlan: (state, action: PayloadAction<number>) => {
      return state.filter((entry) => entry.storeId !== action.payload);
    },

    deleteSKUInPlan: (state, action: PayloadAction<number>) => {
      return state.filter((entry) => entry.skuId !== action.payload);
    },

    editStoreInPlan: (state, action: PayloadAction<{ storeId: number; newName: string }>) => {
      state.forEach((entry) => {
        if (entry.storeId === action.payload.storeId) {
          entry.store = action.payload.newName;
        }
      });
    },
    editSKUInPlan: (state, action: PayloadAction<ISKU>) => {
      state.forEach((entry) => {
        if (entry.skuId === action.payload.id) {
          entry.sku = action.payload.name;
          entry.cost = action.payload.cost;
          entry.price = action.payload.price;
        }
      });
    },
  },
});
export const {
  initializePlanningData,
  updateSalesUnits,
  addStoreInPlan,
  addSKUInPlan,
  editSKUInPlan,
  editStoreInPlan,
  deleteSKUInPlan,
  deleteStoreInPlan,
} = planningSlice.actions;
export default planningSlice.reducer;
