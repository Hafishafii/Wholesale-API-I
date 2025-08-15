import { configureStore } from '@reduxjs/toolkit';
import checkoutReducer from '../../checkout/store/checkoutSlice';

export const store = configureStore({
  reducer: {
    checkout: checkoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
