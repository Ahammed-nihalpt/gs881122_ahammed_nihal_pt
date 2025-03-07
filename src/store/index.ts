import { configureStore } from '@reduxjs/toolkit';
import storesReducer from './slices/storesSlice';
import skusReducer from './slices/skusSlice';

const store = configureStore({
  reducer: {
    stores: storesReducer,
    skus: skusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
