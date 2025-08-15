import { configureStore } from '@reduxjs/toolkit';
import bestSaleReducer from '../../bestsale/store/bestSaleSlice';

export const store = configureStore({
  reducer: {
    bestSale: bestSaleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
