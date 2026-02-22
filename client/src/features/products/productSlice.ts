import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
interface Product {
    productId: number;
    productName: string;
    productImage: string;
    description: string;
    quantity: number;
    price: number;
    specialPrice: number;
    discounte: number;

}
interface ProductState {
    content: Product[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    theLast: boolean;
    isLoading: boolean;
    errorMessage: string;
}

const initialState: ProductState = {
    content: [],
    pageNumber: 0,
    pageSize: 50,
    totalPages: 1,
    totalElements: 1,
    theLast: true,
    isLoading: false,
    errorMessage: ""
};


//define the async thunk action
export const fetchProducts = createAsyncThunk("products/fetchProducts",
    async (queryString: string) => {
        const response = await api.get(`/public/getAllProducts?${queryString}`);
        return response.data;
    }
)

// fetch products by category
export const fetchProductsByCategory = createAsyncThunk("products/fetchProductsByCategory",
    async ({ categoryId, sortBy, sortOrder }: { categoryId: number, sortBy?: string, sortOrder?: string }) => {
        const response = await api.get(`/public/getProductsByCategory/${categoryId}`, {
            params: {
                sortBy,
                sortOrder
            }});        
        return response.data}
    )
//create product slice
const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.content = action.payload.content;
                state.pageNumber = action.payload.pageNumber;
                state.pageSize = action.payload.pageSize;
                state.totalPages = action.payload.totalPages;
                state.totalElements = action.payload.totalElements;
                state.theLast = action.payload.theLast;
                state.errorMessage = "";
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.error.message || "Failed to fetch products";
            })
           
    }
});

export default productSlice.reducer;