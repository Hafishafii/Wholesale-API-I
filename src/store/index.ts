import { configureStore } from '@reduxjs/toolkit';
import adminAuthReducer from '../slices/adminAuthSlice'
import userAuthReducer from '../slices/userAuthSlice'
import checkoutReducer from '../features/checkout/store/checkoutSlice'
import bestSaleReducer from '../features/bestsale/store/bestSaleSlice'
import orderReducer from "../features/orders/slice/orderSlice";
import cartReducer from "../features/cart/slice/CartSlice";
export const store = configureStore({
    reducer: {
        admin: adminAuthReducer,
        checkout: checkoutReducer,
        bestSale: bestSaleReducer,
        orders: orderReducer,
        cart: cartReducer,
        user: userAuthReducer,
    },
});