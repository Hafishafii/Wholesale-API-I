// features/cart/slice/cartSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { type PayloadAction } from "@reduxjs/toolkit";

import { type CartItemType } from "../types/cart.types";

interface CartState {
  items: CartItemType[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItemType>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },
    saveForLater: (_state, action: PayloadAction<number>) => {
      // You can move the item to another list if needed.
      console.log("Saved item for later:", action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  saveForLater,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
