import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Store {
  id: number;
  name: string;
}

interface StoresState {
  stores: Store[];
}

const initialState: StoresState = {
  stores: [],
};

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.stores.push(action.payload);
    },
    removeStore: (state, action: PayloadAction<number>) => {
      state.stores = state.stores.filter((store) => store.id !== action.payload);
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.stores.findIndex((store) => store.id === action.payload.id);
      if (index !== -1) {
        state.stores[index] = action.payload;
      }
    },
  },
});

export const { addStore, removeStore, updateStore } = storesSlice.actions;
export default storesSlice.reducer;
