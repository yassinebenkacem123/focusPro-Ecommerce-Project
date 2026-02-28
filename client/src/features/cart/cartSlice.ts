import { createSlice } from "@reduxjs/toolkit";

export interface CartItem  {
    productId: number;
    productName: string;
    productImage: string;
    price: number;
    discount: number;
    specialPrice: number;
    description: string;
    quantity: number;
}
export interface CartState {
    cart: CartItem[];
    totalPrice: number;
    cartId: number | null;
}

const initialState: CartState = {
    cart: [],
    totalPrice: 0,
    cartId: null
}




const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            const { product, qty } = action.payload;

            const isQuantityExist = product.quantity && product.quantity >= qty;
            if (isQuantityExist) {
                const existingProduct = state.cart.find((item) => item.productId === product.productId);
                if (existingProduct) {
                    const updatedCart = state.cart.map((item) => {
                        if (item.productId === product.productId) {
                            return product;
                        } else {
                            return item;
                        }
                    })
                    state.cart = updatedCart;
                    localStorage.setItem("cartItems", JSON.stringify(state.cart));

                } else {
                    const newCart = [...state.cart, product];
                    state.cart = newCart;
                    localStorage.setItem("cartItems", JSON.stringify(state.cart));
                }
            } else {
                // Intentionally no side-effects here; UI should handle messaging (e.g. toast).
            }
        }

    },
});

export const { addProductToCart } = cartSlice.actions;
export default cartSlice.reducer;