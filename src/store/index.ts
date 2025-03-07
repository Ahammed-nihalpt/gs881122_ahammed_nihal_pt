import { configureStore } from '@reduxjs/toolkit';
import storesReducer from './slices/storesSlice';

const store = configureStore({
  reducer: {
    stores: storesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
