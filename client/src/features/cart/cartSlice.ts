import { createSlice } from "@reduxjs/toolkit";
interface CartState {
    cart: any[];
    totalPrice: number;
    cartId: number | null;
}

const initialState: CartState = {
    cart:[],
    totalPrice:0,
    cartId:null
}




const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addProductToCart:(state, action)=>{
            const {product, qty} = action.payload;

            const isQuantityExist = product.quantity && product.quantity >= qty;
            if(isQuantityExist){
               const existingProduct = state.cart.find((item) => item.productId === product.productId);
               if(existingProduct){
                    const updatedCart = state.cart.map((item) => {
                        if(item.productId === product.productId){
                            return product;
                        }else{
                            return item;
                        }
                    })
                    state.cart = updatedCart;
                }else{
                    const newCart = [...state.cart, product];
                    state.cart = newCart;
                }
                
            }
        }

    },
});

export const {addProductToCart} = cartSlice.actions;
export default cartSlice.reducer;