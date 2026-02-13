import productReducer from "../features/products/productSlice";
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authentication/authSlice';
const store = configureStore({
    reducer: {
        products: productReducer,
        auth: authReducer

    },
    preloadedState: {}
})

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
