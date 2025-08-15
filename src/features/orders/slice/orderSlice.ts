// src/features/orders/slice/orderSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type OrderDetailsType } from "../types/Ordertypes";

interface OrdersState {
  orders: OrderDetailsType[];
}

const initialState: OrdersState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<OrderDetailsType[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
