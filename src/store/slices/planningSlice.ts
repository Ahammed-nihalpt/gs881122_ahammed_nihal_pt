import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlanning, ISalesData } from '../../types/IPlanning';

const initialState: IPlanning = {
  salesData: [],
};

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    updateSalesUnits: (state, action: PayloadAction<ISalesData>) => {
      const { storeId, skuId, week, salesUnits } = action.payload;
      const existingData = state.salesData.find(
        (data) => data.storeId === storeId && data.skuId === skuId && data.week === week
      );
      if (existingData) {
        existingData.salesUnits = salesUnits;
      } else {
        state.salesData.push(action.payload);
      }
    },
  },
});

export const { updateSalesUnits } = planningSlice.actions;
export default planningSlice.reducer;
