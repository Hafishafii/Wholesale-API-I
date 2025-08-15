import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../../../types/product'; 
import type  { Address } from '../../../types/shipping';
import type { Invoice } from '../../../types/invoice'; 

interface CheckoutState {
  loading: boolean;
  product: Product | null;
  address: Address | null;
  invoice: Invoice | null;
}

const initialState: CheckoutState = {
  loading: true,
  product: null,
  address: null,
  invoice: null,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setProduct(state, action: PayloadAction<Product>) {
      state.product = action.payload;
    },
    setAddress(state, action: PayloadAction<Address>) {
      state.address = action.payload;
    },
    setInvoice(state, action: PayloadAction<Invoice>) {
      state.invoice = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setProduct, setAddress, setInvoice, setLoading } = checkoutSlice.actions;
export default checkoutSlice.reducer;
