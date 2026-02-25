import productReducer from "../features/products/productSlice";
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice';
import categoryReducer from '../features/categories/categorySlice';
import cartReducer from '../features/cart/cartSlice';

const cartItems = localStorage.getItem("cartItems") 
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [];

const initialState = {
    carts:{
        cart: cartItems,
        totalPrice: 0,
        cartId: null,
    }
}
const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer,
        categories:categoryReducer,
        carts: cartReducer,
    },
    preloadedState: initialState, // this allows us to initialize the cart state with items from localStorage when the store is created
})

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
