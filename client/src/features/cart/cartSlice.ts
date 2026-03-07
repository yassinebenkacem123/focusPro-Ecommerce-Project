import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    productId: number;
    productName: string;
    productImage: string;
    price: number;
    discount: number;
    specialPrice: number;
    description: string;
    /** Available stock at the time item was added. */
    availableQuantity?: number;
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
        addProductToCart: (
            state,
            action: PayloadAction<{ product: CartItem; qty: number }>
        ) => {
            const { product, qty } = action.payload;

            const availableQty = Number(product.availableQuantity ?? 0);
            if (!Number.isFinite(availableQty) || availableQty <= 0 || qty <= 0) {
                return;
            }

            const existingProduct = state.cart.find((item) => item.productId === product.productId);
            if (existingProduct) {
                const updatedCart = state.cart.map((item) => {
                    if (item.productId !== product.productId) return item;

                    const nextQty = Math.min(item.quantity + qty, availableQty);
                    return {
                        ...item,
                        ...product,
                        availableQuantity: availableQty,
                        quantity: nextQty,
                    };
                });
                state.cart = updatedCart;
            } else {
                const newItem: CartItem = {
                    ...product,
                    availableQuantity: availableQty,
                    quantity: Math.min(qty, availableQty),
                };
                state.cart = [...state.cart, newItem];
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cart));
        },
        increaseQuantity: (state, action: PayloadAction<{ productId: number }>) => {
            const { productId } = action.payload;

            const updatedCart = state.cart.map((item) => {
                if (item.productId !== productId) return item;

                const availableQty = item.availableQuantity;
                if (typeof availableQty === "number" && Number.isFinite(availableQty)) {
                    if (item.quantity >= availableQty) return item;
                }

                return { ...item, quantity: item.quantity + 1 };
            });
            state.cart = updatedCart;
            localStorage.setItem("cartItems", JSON.stringify(state.cart));
        },
        decreaseQuantity: (state, action: PayloadAction<{ productId: number }>) => {
            const { productId } = action.payload;
            if (state.cart.find(item => item.productId === productId)?.quantity === 1) {
                return;
            }

            const updatedCart = state.cart.map((item) => {
                if (item.productId === productId) {
                    return { ...item, quantity: Math.max(1, item.quantity - 1) };
                } else {
                    return item;
                }
            });
            state.cart = updatedCart;
            localStorage.setItem("cartItems", JSON.stringify(state.cart));
        },

        removeItem: (state, action: PayloadAction<{ productId: number }>) => {
            const { productId } = action.payload;
            const existingProduct = state.cart.find((item) => item.productId === productId);
            if (!existingProduct) return;

            state.cart = state.cart.filter((item) => item.productId !== productId);
            localStorage.setItem("cartItems", JSON.stringify(state.cart));
        },
    },
});

export const { addProductToCart, increaseQuantity, decreaseQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;