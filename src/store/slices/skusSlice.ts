import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISKU } from '../../types/ISKU';

const initialState: ISKU[] = [];

const skusSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<ISKU>) => {
      state.push(action.payload);
    },
    removeSKU: (state, action: PayloadAction<number>) => {
      return state.filter((sku) => sku.id !== action.payload);
    },
    updateSKU: (state, action: PayloadAction<ISKU>) => {
      const index = state.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
  },
});

export const { addSKU, removeSKU, updateSKU } = skusSlice.actions;
export default skusSlice.reducer;
