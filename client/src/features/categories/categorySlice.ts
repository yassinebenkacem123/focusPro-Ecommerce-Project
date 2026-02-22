import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../../api/api';
const initialState ={
    content:[],
    pageNumber: 0,
    pageSize: 50,
    totalPages: 1,
    totalElements: 1,
    theLast: true,
    isLoading: false,
    errorMessage: ""
}
export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",
    async ()=>{
        const response = await api.get("/public/categories");
        return response.data;
    }
)
const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchCategories.pending,(state)=>{
            state.isLoading = true;
            state.errorMessage = "";
        })
        .addCase(fetchCategories.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.content = action.payload.content;
            state.pageNumber = action.payload.pageNumber;
            state.pageSize = action.payload.pageSize;
            state.totalPages = action.payload.totalPages;
            state.totalElements = action.payload.totalElements;
            state.theLast = action.payload.theLast;
            state.errorMessage = "";

        })
        .addCase(fetchCategories.rejected,(state,action)=>{
            state.isLoading = false;
            state.errorMessage = action.error.message || "Failed to fetch categories";
        })
    }
})
export default categorySlice.reducer;