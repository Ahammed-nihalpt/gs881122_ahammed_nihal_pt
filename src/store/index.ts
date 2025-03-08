import { configureStore } from '@reduxjs/toolkit';
import storesReducer from './slices/storesSlice';
import skusReducer from './slices/skusSlice';
import planningReducer from './slices/planningSlice';

const store = configureStore({
  reducer: {
    stores: storesReducer,
    skus: skusReducer,
    planning: planningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
