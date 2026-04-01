import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

interface Address {
    addressId: number | null,
    buildingName: string,
    city: string,
    country: string,
    pincode: string,
    state: string,
    street: string
}

interface AddressState {
    addresses: Address[],
    isLoading: boolean,
    errorMessage: string,
}

export const fetchUserAddresses = createAsyncThunk(
    "addresses/fetchUserAddresses",
    async (_, thunkAPI) => {
        const response = await api.get("/getAddresses/user");
        if (response.status === 200) {
            return response.data as Address[];
        } else {
            return thunkAPI.rejectWithValue("Failed to fetch addresses!");
        }
    }
)

export const addNewCategory = createAsyncThunk(
    "categories/addNewCategory",
    async (categoryData: { categoryName: string }, thunkAPI) => {
        try {
            const response = await api.post("/admin/addCategory", categoryData);
            if (response.status === 200) {
                return response.data;
            } else {
                return thunkAPI.rejectWithValue("Failed to add new category!");
            }
        }catch(error){
            return thunkAPI.rejectWithValue("Failed to add new category!");
        }
    }
)

const initialState: AddressState = {
    addresses: [],
    isLoading: false,
    errorMessage: ""
}
const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserAddresses.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = "";
            })
            .addCase(fetchUserAddresses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.addresses = action.payload;
            })
            .addCase(fetchUserAddresses.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage =
                    (action.payload as string) ||
                    action.error.message ||
                    "Failed to fetch addresses!";
            })
            .addCase(addNewCategory.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = "";
            }).addCase(addNewCategory.fulfilled, (state, action) => {
                state.addresses.push(action.payload);
                state.isLoading = false;
            }).addCase(addNewCategory.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage =
                    (action.payload as string) ||
                    action.error.message ||
                    "Failed to add new category!";
            })
            
    }
})

export default addressSlice.reducer;