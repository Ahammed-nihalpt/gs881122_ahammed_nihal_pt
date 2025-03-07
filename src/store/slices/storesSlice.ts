import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStore } from '../../types/IStores';

const initialState: IStore[] = [];

const storesSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<IStore>) => {
      state.push(action.payload);
    },

    removeStore: (state, action: PayloadAction<number>) => {
      return state.filter((store) => store.id !== action.payload);
    },

    updateStore: (state, action: PayloadAction<IStore>) => {
      const index = state.findIndex((store) => store.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    reorderStores: (_, action: PayloadAction<IStore[]>) => {
      return action.payload;
    },
  },
});

export const { addStore, removeStore, updateStore, reorderStores } = storesSlice.actions;

export default storesSlice.reducer;
