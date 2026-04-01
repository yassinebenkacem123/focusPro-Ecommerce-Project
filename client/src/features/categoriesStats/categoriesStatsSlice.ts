import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
export interface categoryStatsProp {
    categoryId?: number;
    categoryName: string;
    numberProducts: number;
    rating: number;
    numberSellingProducts: number;
}
export interface CategoryStatsState {
    categoriesStats: categoryStatsProp[];
    isFetchingCategories?: boolean;
    isAddingCategory?: boolean;
    isUpdatingCategory?: boolean;
    updatingCategoryId?: number | null;
    isDeletingCategory?: boolean;
    deletingCategoryId?: number | null;
    fetchErrorMessage?: string | null;
    addCategoryErrorMessage?: string | null;
    updateCategoryErrorMessage?: string | null;
    deleteCategoryErrorMessage?: string | null;
    successMessage?: string | null;
}



const initialState: CategoryStatsState = {
    categoriesStats: [],
    isFetchingCategories: false,
    isAddingCategory: false,
    isUpdatingCategory: false,
    updatingCategoryId: null,
    isDeletingCategory: false,
    deletingCategoryId: null,
    fetchErrorMessage: null,
    addCategoryErrorMessage: null,
    updateCategoryErrorMessage: null,
    deleteCategoryErrorMessage: null,
    successMessage: null

};

// get categories statistics from the server :

export const getCategoriesStats = createAsyncThunk(
    "categoriesStats/getCategoriesStats", async (_, thunkAPI) => {
        try{
            const response = await api.get("/admin/stats/categories");
            return response.data  as categoryStatsProp[];
        }catch(error){
            return thunkAPI.rejectWithValue("Failed to fetch categories statistics");
        }
    }
)

export const addNewCategoryToStats = createAsyncThunk(
    "categoriesStats/addNewCategoryToStats", async (categoryName: string, thunkAPI) => {
        try{
            const response = await api.post("/admin/addCategory", { categoryName });
            if(response.status !== 200) return thunkAPI.rejectWithValue("Failed to add new category");

            await thunkAPI.dispatch(getCategoriesStats());
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue("Failed to add new category");
        }
    }
)

export const deleteCategoryFromStats = createAsyncThunk(
    "categoriesStats/deleteCategoryFromStats", async (categoryId: number, thunkAPI) => {
        try{
            const response = await api.delete(`/admin/deleteCategory/${categoryId}`);
            if(response.status !== 200) return thunkAPI.rejectWithValue("Failed to delete category");

            await thunkAPI.dispatch(getCategoriesStats());
            return response.data?.message || "Category deleted successfully!";
        }catch(error: any){
            const backendMessage =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "";

            const normalizedMessage = String(backendMessage).toLowerCase();

            if (
                normalizedMessage.includes("foreign key") ||
                normalizedMessage.includes("still referenced") ||
                normalizedMessage.includes("violates")
            ) {
                return thunkAPI.rejectWithValue(
                    "Cannot delete category because it still has products. Move or delete those products first."
                );
            }

            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to delete category"
            );
        }
    }
)

export const updateCategoryFromStats = createAsyncThunk(
    "categoriesStats/updateCategoryFromStats",
    async (
        { categoryId, categoryName }: { categoryId: number; categoryName: string },
        thunkAPI
    ) => {
        try {
            const response = await api.put(`/admin/updateCategory/${categoryId}`, { categoryName });
            if (response.status !== 200) {
                return thunkAPI.rejectWithValue("Failed to update category");
            }

            await thunkAPI.dispatch(getCategoriesStats());
            return response.data?.message || "Category updated successfully!";
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Failed to update category"
            );
        }
    }
)

const categoriesStatsSlice = createSlice({
    name: "categoriesStats",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder.addCase(getCategoriesStats.pending, (state)=>{
            state.isFetchingCategories = true;
            state.fetchErrorMessage = null;
        })
        .addCase(getCategoriesStats.fulfilled, (state, action)=>{
            state.isFetchingCategories = false;
            state.categoriesStats = action.payload;
            state.fetchErrorMessage = null;
        })
        .addCase(getCategoriesStats.rejected, (state, action)=>{
            state.isFetchingCategories = false;
            state.fetchErrorMessage = (action.payload as string) ||
                    action.error.message ||
                    "Failed to fetch categories statistics!";
        })

        .addCase(addNewCategoryToStats.pending, (state)=>{
            state.isAddingCategory = true;
            state.addCategoryErrorMessage = null;
            state.successMessage = null;
        })
        .addCase(addNewCategoryToStats.fulfilled, (state, action)=>{
            state.isAddingCategory = false;
            state.successMessage = action.payload ||  "New category added successfully!";
            state.addCategoryErrorMessage = null;
        })
        .addCase(addNewCategoryToStats.rejected, (state, action)=>{
            state.isAddingCategory = false;
            state.successMessage = null;
            state.addCategoryErrorMessage = (action.payload as string) ||
                    action.error.message ||
                    "Failed to add new category!";
        })

        .addCase(updateCategoryFromStats.pending, (state, action)=>{
            state.isUpdatingCategory = true;
            state.updatingCategoryId = action.meta.arg.categoryId;
            state.updateCategoryErrorMessage = null;
            state.successMessage = null;
        })
        .addCase(updateCategoryFromStats.fulfilled, (state, action)=>{
            state.isUpdatingCategory = false;
            state.updatingCategoryId = null;
            state.updateCategoryErrorMessage = null;
            state.successMessage = action.payload || "Category updated successfully!";
        })
        .addCase(updateCategoryFromStats.rejected, (state, action)=>{
            state.isUpdatingCategory = false;
            state.updatingCategoryId = null;
            state.successMessage = null;
            state.updateCategoryErrorMessage = (action.payload as string) ||
                    action.error.message ||
                    "Failed to update category!";
        })

        .addCase(deleteCategoryFromStats.pending, (state, action)=>{
            state.isDeletingCategory = true;
            state.deletingCategoryId = action.meta.arg;
            state.deleteCategoryErrorMessage = null;
            state.successMessage = null;
        })
        .addCase(deleteCategoryFromStats.fulfilled, (state, action)=>{
            state.isDeletingCategory = false;
            state.deletingCategoryId = null;
            state.deleteCategoryErrorMessage = null;
            state.successMessage = action.payload || "Category deleted successfully!";
        })
        .addCase(deleteCategoryFromStats.rejected, (state, action)=>{
            state.isDeletingCategory = false;
            state.deletingCategoryId = null;
            state.successMessage = null;
            state.deleteCategoryErrorMessage = (action.payload as string) ||
                    action.error.message ||
                    "Failed to delete category!";
        })
    }
});

export default categoriesStatsSlice.reducer;