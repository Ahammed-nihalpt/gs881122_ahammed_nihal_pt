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

    // This function is called when a new store is added.
    // It adds the new store along with its SKUs to the planning state.
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

    // This function is called when a new SKU is added.
    // It adds the new SKU to all existing stores in the planning state.
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

    // This function is called when a store is deleted.
    // It removes all planning entries associated with the given store.
    deleteStoreInPlan: (state, action: PayloadAction<number>) => {
      return state.filter((entry) => entry.storeId !== action.payload);
    },

    // This function is called when a SKU is deleted.
    // It removes all planning entries associated with the given SKU.
    deleteSKUInPlan: (state, action: PayloadAction<number>) => {
      return state.filter((entry) => entry.skuId !== action.payload);
    },

    // This function is called when a store name is edited.
    // It updates the store name in all relevant planning entries.
    editStoreInPlan: (state, action: PayloadAction<{ storeId: number; newName: string }>) => {
      state.forEach((entry) => {
        if (entry.storeId === action.payload.storeId) {
          entry.store = action.payload.newName;
        }
      });
    },

    // This function is called when a SKU is edited.
    // It updates the SKU name, cost, and price in all relevant planning entries.
    editSKUInPlan: (state, action: PayloadAction<ISKU>) => {
      state.forEach((entry) => {
        if (entry.skuId === action.payload.id) {
          entry.sku = action.payload.name;
          entry.cost = action.payload.cost;
          entry.price = action.payload.price;

          // Recalculate sales values if salesUnits exist
          entry.weeklyData.forEach((weekData) => {
            if (weekData.salesUnits > 0) {
              weekData.salesDollars = weekData.salesUnits * entry.price;
              weekData.gmDollars = weekData.salesDollars - weekData.salesUnits * entry.cost;
              const gmPercentage =
                weekData.salesDollars !== 0
                  ? (weekData.gmDollars / weekData.salesDollars) * 100
                  : 0;
              weekData.gmPercentage = isNaN(gmPercentage) ? 0 : gmPercentage;
            }
          });
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
