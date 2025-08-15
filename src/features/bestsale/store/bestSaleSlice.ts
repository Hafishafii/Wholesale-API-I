import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../../types/product';

interface BestSaleState {
  products: Product[];
  loading: boolean;
}

const initialState: BestSaleState = {
  products: [],
  loading: true,
};

const bestSaleSlice = createSlice({
  name: 'bestSale',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setLoading } = bestSaleSlice.actions;
export default bestSaleSlice.reducer;
